/**
 * NMS Coordinate Conversion Logic (Transpiled from GlyphMaster.py)
 */

// Helper to pad hex strings
const pad = (num, len) => num.toString(16).toUpperCase().padStart(len, '0');

// Constructs the 16-digit Universe Address (UA)
function formatUA(p, sss, gg, yy, zzz, xxx) {
    return `0x00${p.toString(16).toUpperCase()}${pad(sss, 3)}${pad(gg, 2)}${pad(yy & 0xFF, 2)}${pad(zzz & 0xFFF, 3)}${pad(xxx & 0xFFF, 3)}`.toUpperCase();
}

// Calculates all formats from raw components
function calculateAll(p, sss, xxx, yy, zzz, gg = 0) {
    const gx = (xxx + 2047) & 0xFFFF;
    const gy = (yy + 127) & 0xFFFF;
    const gz = (zzz + 2047) & 0xFFFF;
    
    const gc = `${pad(gx, 4)}:${pad(gy, 4)}:${pad(gz, 4)}:${pad(sss, 4)}`;
    const portal = `${p.toString(16).toUpperCase()}${pad(sss, 3)}${pad(yy & 0xFF, 2)}${pad(zzz & 0xFFF, 3)}${pad(xxx & 0xFFF, 3)}`;
    const ua = formatUA(p, sss, gg, yy, zzz, xxx);
    
    return { gc, portal: portal.toUpperCase(), ua };
}

/**
 * Example Event Listener for Tab 3 (Galactic Address to Glyphs)
 * You would bind this to the .gacoords input element in your existing file.
 */
$('.gacoords').on('input', function() {
    const rawValue = $(this).val();
    const parts = rawValue.split(':');
    
    if (parts.length === 4) {
        const xxx = parseInt(parts[0], 16) - 2047;
        const yy = parseInt(parts[1], 16) - 127;
        const zzz = parseInt(parts[2], 16) - 2047;
        const sss = parseInt(parts[3], 16);
        
        // Default to Planet Index 0
        const results = calculateAll(0, sss, xxx, yy, zzz, 0);
        
        // Update the UI elements defined in index.html
        $('.galacticAddress').text(results.gc);
        $('.gacoordstoglyphs').text(results.portal);
        $('#galacticAddressCode').val(results.ua); // Universe Address hidden input
    }
});
