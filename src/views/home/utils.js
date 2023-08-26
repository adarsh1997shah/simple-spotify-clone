export function getBackgroundColor(colors) {
  const color1 = colors[0];

  return `linear-gradient(135deg, rgba(${color1.red},${color1.green},${color1.blue}, 0.5) 0%, rgba(${color1.red},${color1.green},${color1.blue}, 1) 100%)`;
}
