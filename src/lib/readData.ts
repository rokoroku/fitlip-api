/**
 * Created by Rok on 2016-09-19.
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parse');
const transform = require('stream-transform');

// internal cache
const internal = {
  data: null,
  filePath: path.join(__dirname, '../../data/data.csv'),
};

function readData(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    if (internal.data) {
      return resolve(internal.data);
    }

    let i = 0;
    const data = [];

    const parser = csvParser({
      delimiter: ',',
      auto_parse: true,
      columns: true,
    });

    const transformer = transform((record) => {

      record['컬러코드'] = _.compact([
        record['컬러코드1'],
        record['컬러코드2'],
        record['컬러코드3'],
      ]);

      if (_.isEmpty(record['컬러코드'])) {
        return;
      }

      record['제품'] = _.compact([
        record['제품1'],
        record['제품2'],
        record['제품3'],
      ]);

      delete record['컬러코드1'];
      delete record['컬러코드2'];
      delete record['컬러코드3'];

      delete record['제품1'];
      delete record['제품2'];
      delete record['제품3'];

      data.push(record);
    });

    fs.createReadStream(internal.filePath)
      .pipe(parser)
      .pipe(transformer);

    parser.on('finish', () => resolve(data));
    parser.on('error', reject);
  });
}

export default readData;
