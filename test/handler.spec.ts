import { expect } from 'chai';
import { handler } from 'src/index';

describe('Handler', () => {
  it('should respond to lambda handler', (done) => {
    const url = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAwZrMsYhKA5gej2RaFHSaHZ5pAajfUy9Vs2Ve2TnfhQeh1FyM';
    handler({ url }, null, (err, res) => {
      console.log(err);
      console.log(res);
      expect(err).to.be.not.exist;
      expect(res).to.be.exist;
      done();
    });
  });
});
