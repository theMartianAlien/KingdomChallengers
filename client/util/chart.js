export function generateRGBAColors(count) {
    const colors = [];
  
    for (let i = 0; i < count; i++) {
      // Use hue shifting for variation
      const hue = Math.floor((360 / count) * i);
      const saturation = 70 + Math.floor(Math.random() * 20); // 70–90%
      const lightness = 50 + Math.floor(Math.random() * 10);  // 50–60%
      const alpha = 0.8; // semi-transparent
  
      // Convert HSL to RGB
      const rgb = hslToRgb(hue / 360, saturation / 100, lightness / 100);
      const rgba = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  
      colors.push(rgba);
    }
  
    return colors;
  }

  function hslToRgb(h, s, l) {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }