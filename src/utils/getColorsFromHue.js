const colorFn = require("@k-vyn/coloralgorithm");

export default function getColorsFromHue({ hue, inverted = false }) {
  const { properties, options } = require(`data/${hue}.json`);

  const output = colorFn.generate(properties, options);

  const { colors } = output.find(scale => scale.inverted === inverted) || { colors: [] };

  return colors || [];
}