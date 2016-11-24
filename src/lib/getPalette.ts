const chroma = require('chroma-js');
const getPixels = require('get-pixels');
const getRgbaPalette = require('get-rgba-palette');
const getImageColors = require('get-image-colors');

function filter(pixels, index) {

  const red = pixels[index];
  const green = pixels[index + 1];
  const blue = pixels[index + 2];
  const alpha = pixels[index + 3];

  if (alpha < 127 || red < 100) {
    return false;
  }

  const color = chroma(red, green, blue);
  const hsl = color.hsl();
  const hue = hsl[0];
  const saturation = hsl[1];
  const lightness = hsl[2];
  // console.log(hue, saturation, lightness);

  // TODO: drop colors if too much populations (e.g. color of skin)
  return ((0 <= hue && hue <= 25) || (325 <= hue && hue <= 360))
    && saturation >= 0.5
    && lightness >= 0.3 && lightness <= 0.9;
}

function getWeight(color: Chroma.Color) {
  const hue = color.get('hsl.h');
  return hue < 180 ? hue : 360 - hue;
}

function colorComparator(color1: Chroma.Color, color2: Chroma.Color) {
  return getWeight(color1) - getWeight(color2);
}

export default function paletteFromBitmap(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    getPixels(path, function (err, pixels) {
      if (err) {
        return reject(err);
      }
      try {
        const palette = (getRgbaPalette(pixels.data, 10, 20, filter) || [])
          .map((rgba) => chroma(rgba))
          .sort(colorComparator);
        resolve(palette);
      } catch (error) {
        resolve([]);
      }
    });
  });
}
