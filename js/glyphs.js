$('document').ready(function() {
  
  var version = "V 1.2";
  $('.version').html(version);
  
  const GlyphConverter = {
    pad: (num, len) => num.toString(16).toUpperCase().padStart(len, '0'),

    // Correctly parses Universal Address (0x...) to components
    parseUA: function(uaString) {
      const clean = uaString.toLowerCase().replace('0x', '');
      // Format: 00 P SSS GG YY ZZZ XXX
      const p = parseInt(clean.substring(2, 3), 16);
      const sss = parseInt(clean.substring(3, 6), 16);
      const yy = parseInt(clean.substring(8, 10), 16) - 128;
      const zzz = parseInt(clean.substring(10, 13), 16) - 2048;
      const xxx = parseInt(clean.substring(13, 16), 16) - 2048;
      return { p, sss, xxx, yy, zzz };
    },

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
      return { gc, portal: portal.toUpperCase(), ua, p, sss, xxx, yy, zzz };
    }
  };

  // --- Copy Handlers ---
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
    $(this
