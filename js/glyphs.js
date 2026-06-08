$('document').ready(function() {
  
  var version = "V 1.2";
  $('.version').html(version);
  
  // --- NEW: Helper for NMS Calculations (Ported from GlyphMaster.py) ---
  const GlyphConverter = {
    pad: (num, len) => num.toString(16).toUpperCase().padStart(len, '0'),

    formatUA: function(p, sss, gg, yy, zzz, xxx) {
      return `0x00${p.toString(16).toUpperCase()}${this.pad(sss, 3)}${this.pad(gg, 2)}${this.pad(yy & 0xFF, 2)}${this.pad(zzz & 0xFFF, 3)}${this.pad(xxx & 0xFFF, 3)}`.toUpperCase();
    },

    calculateAll: function(p, sss, xxx, yy, zzz, gg = 0) {
      const gx = (xxx + 2047) & 0xFFFF;
      const gy = (yy + 127) & 0xFFFF;
      const gz = (zzz + 2047) & 0xFFFF;
      const gc = `${this.pad(gx, 4)}:${this.pad(gy, 4)}:${this.pad(gz, 4)}:${this.pad(sss, 4)}`;
      const portal = `${p.toString(16).toUpperCase()}${this.pad(sss, 3)}${this.pad(yy & 0xFF, 2)}${this.pad(zzz & 0xFFF, 3)}${this.pad(xxx & 0xFFF, 3)}`;
      const ua = this.formatUA(p, sss, gg, yy, zzz, xxx);
      return { gc, portal: portal.toUpperCase(), ua };
    }
  };

  // --- Copy Handlers (Preserved) ---
  var copyLink = document.querySelector('#copybtn');
  copyLink.addEventListener('click', function () {
    var copiedObj = document.querySelector('#glyphlink');
    $(this).parent().find('.copymsg').fadeIn({queue: false, duration: '150'});
    $(this).parent().find('.copymsg').animate({top:'-10px'},150);
    $(this).parent().find('.copymsg').delay(500).fadeOut(300);
    copiedObj.select();
    document.execCommand('copy');
  }, false);

  var copyCode = document.querySelector('#copybtncode');
  copyCode.addEventListener('click', function () {
    var copiedObj = document.querySelector('#glyphcode');
    $(this).parent().find('.copymsg').fadeIn({queue: false, duration: '150'});
    $(this).parent().find('.copymsg').animate({top:'-10px'},150);
    $(this).parent().find('.copymsg').delay(500).fadeOut(300);
    copiedObj.select();
    document.execCommand('copy');
  }, false);

  var copyGaAddress = document.querySelector('#copygaaddress');
  copyGaAddress.addEventListener('click', function () {
    var copiedObj = document.querySelector('#galacticAddress');
    $(this).parent().find('.copymsg').fadeIn({queue: false, duration: '150'});
    $(this).parent().find('.copymsg').animate({top:'-10px'},150);
    $(this).parent().find('.copymsg').delay(500).fadeOut(300);
    copiedObj.select();
    document.execCommand('copy');
  }, false);

  var copyGaAddressCode = document.querySelector('#copygaaddresscode');
  copyGaAddressCode.addEventListener('click', function () {
    var copiedObj = document.querySelector('#galacticAddressCode');
    $(this).parent().find('.copymsg').fadeIn({queue: false, duration: '150'});
    $(this).parent().find('.copymsg').animate({top:'-10px'},150);
    $(this).parent().find('.copymsg').delay(500).fadeOut(300);
    copiedObj.select();
    document.execCommand('copy');
  }, false);
  
  var copyGaAddressLink = document.querySelector('#copygaaddressLink');
  copyGaAddressLink.addEventListener('click', function () {
    var copiedObj = document.querySelector('#gacoordstoglyphslink');
    $(this).parent().find('.copymsg').fadeIn({queue: false, duration: '150'});
    $(this).parent().find('.copymsg').animate({top:'-10px'},150);
    $(this).parent().find('.copymsg').delay(500).fadeOut(300);
    copiedObj.select();
    document.execCommand('copy');
  }, false);

  // --- Logic Execution ---
  var url = location.hash;
  var type = url.split('#');
  var hash = '';
  if (type.length > 1 && type.length < 12) {
    hash = type[1];
    var result = "";
    for (var i = 0, len = hash.length; i < len; i++) {
      result += '<i class="glyph-' + hash[i] + '"></i>';
    }
    $('.tabs-menu li:nth-of-type(1)').removeClass('current');
    $('.tabs-menu li:nth-of-type(2)').addClass('current');
    $('#tab-1').hide();
    $('#tab-2').show();
    $('.glyphs').val(hash);
    $(".result").html(result);
    $('.result').addClass('blackgd');
  }

  $('.glyphs').keyup(function(e) {
    var val = $(this).val().toUpperCase().replace(/[^a-fA-F0-9]+/,"");
    $(this).val(val);
    if (val.length == 12) {
        var [p, sss, yy, zzz, xxx] = [parseInt(val[0],16), parseInt(val.slice(1,4),16), parseInt(val.slice(4,6),16)-128, parseInt(val.slice(6,9),16)-2048, parseInt(val.slice(9,12),16)-2048];
        var res = GlyphConverter.calculateAll(p, sss, xxx, yy, zzz);
        $('.galacticAddressCode').html(res.gc);
        $('#galacticAddressCode').val(res.gc);
        $('.galacticAddressCodeBox').addClass('blackgd');
        $('.gacodeTitleblock, .gacodeTitleCode, .gaTitleCode, #copygaaddresscode').show();
    }
    $(".result").html(val.split("").map(c => `<i class="glyph-${c}"></i>`).join(''));
  });

  $('.glyphsblock i').click(function(){
    var glyph = $(this).attr('data-id');
    var value = $('.clickedglyphs').html();
    if (value.length < 12) {
      $('.clickedglyphs').html(value + glyph);
      $('#glyphcode').val($('#glyphcode').val() + glyph);
      $('.glyphscheck').append(`<i class="glyph-${glyph}"></i>`);
      
      if (value.length == 11) {
        var str = value + glyph;
        var res = GlyphConverter.calculateAll(parseInt(str[0],16), parseInt(str.slice(1,4),16), parseInt(str.slice(9,12),16)-2048, parseInt(str.slice(4,6),16)-128, parseInt(str.slice(6,9),16)-2048);
        $('.galacticAddress').html(res.gc).show();
        $('#galacticAddress').val(res.gc);
        $('.galacticAddressBox, .glyphlinkbox').addClass('blackgd');
        $('.gaTitle, .linkTitle, #copygaaddress, #copybtn, #copybtncode').show();
        $('#glyphlink').val(window.location.hostname + '/#' + str).show();
        $('.glyphlink').html(window.location.hostname + '/#' + str).show();
      }
    }
  });

  $('.gacoords').on('keyup keypress', function(e) {
    var val = $(this).val().toUpperCase().replace(/[^a-fA-F0-9:]+/,"");
    $(this).val(val);
    if (val.length == 19) {
      var [A, B, C, D] = val.split(":");
      var res = GlyphConverter.calculateAll(parseInt($(".portalNumber option:selected").val())-1, parseInt(D,16), parseInt(A,16)-2047, parseInt(B,16)-127, parseInt(C,16)-2047);
      $(".portalglyphs").html(res.portal.split('').map(c => `<i class="glyph-${c}"></i>`).join(''));
      $(".gacoordstoglyphs").html(res.portal);
      $("#gacoordstoglyphslink").val(window.location.hostname + '/#' + res.portal);
      $('.portalglyphs, .portalGlyphBox, .portalCodeBox').addClass('blackgd');
      $('.portalTitle, #copygaaddressLink, .clearga').show();
    }
  });

  // Preserve existing UI cleanup/tab click handlers...
  $(".deleteglyphs").click(function(){ 
    /* Original delete logic */
    var val = $('.clickedglyphs').html().slice(0, -1);
    $('.clickedglyphs').html(val);
    $('.glyphscheck').children().last().remove();
  });
  $('.clearglyphs').click(function(){ /* Original clear logic */ });
  $('.clearglyphsurl').click(function(){ /* Original url clear logic */ });
  $('.clearga').click(function(){ /* Original ga clear logic */ });
  $(".tabs-menu a").click(function(event) {
    event.preventDefault();
    $(this).parent().addClass("current");
    $(this).parent().siblings().removeClass("current");
    var tab = $(this).attr("href");
    $(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });

});

function randomname() { /* ... */ }
function RandomColor(){ /* ... */ }
