import * as _ from 'lodash';
import * as chroma from 'chroma-js';
import readData from './readData';
import ciede2000 from './ciede2000';

const THRESHOLD = 10;

function caculateDiff(color1: Chroma.Color, color2: Chroma.Color) {
  const lab1 = color1.lab();
  const lab2 = color2.lab();
  const c1 = { L: lab1[0], a: lab1[1], b: lab1[2] };
  const c2 = { L: lab2[0], a: lab2[1], b: lab2[2] };
  return ciede2000(c1, c2);
}

export default function search(color: string | string[] | Chroma.Color | Chroma.Color[], limit?: number): Promise<any> {
  if (_.isString(color)) {
    color = chroma(color as string);
  } else if (_.isArray(color) && _.isString(color[0])) {
    color = (color as string[]).map((hex) => chroma(hex));
  }
  if (!limit) {
    limit = 3;
  }
  const inputColors = _.castArray(color) as Chroma.Color[];
  const res = readData().then((data) => data.reduce((result, data) => {
    let hex = String(_.get(data, '컬러코드[0]', '#000000'));
    if (hex[0] !== '#') {
      hex = '#' + hex;
    }

    // get score based on color differents
    const score = inputColors.slice(0, 4).reduce((score, color) => {
      const diff = caculateDiff(color, chroma(hex));
      // const diff = caculateDiff(color as Chroma.Color, chroma(hex));
      return diff < 100 ? score + (100 - diff) : score;
    }, 0);

    // push result only if minimum score
    if (score > 50) {
      result.push(_.assign({ score: score }, data));
    }
    return result;
  }, []).sort((lv, rv) => rv.score - lv.score)
    .slice(0, limit));
  return res;
}
