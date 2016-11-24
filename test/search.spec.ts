import { expect } from 'chai';
import getPalette from 'src/lib/getPalette';
import readData from 'src/lib/readData';
import search from 'src/lib/search';

describe('Palette', () => {
  it('should pick color palette from image', async () => {
    const source = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAwZrMsYhKA5gej2RaFHSaHZ5pAajfUy9Vs2Ve2TnfhQeh1FyM';
    const palette = await getPalette(source);
    console.log(palette.map(color => color.hex()));
    expect(palette).to.be.an('array').that.is.not.empty;
  });
});

describe('Search', () => {
  it('should read data from db', async () => {
    const data = await readData();
    console.log(data.length);
    expect(data).to.be.an('array').that.is.not.empty;
  });

  it('should pick pick colors #1', async () => {
    const source = 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAwZrMsYhKA5gej2RaFHSaHZ5pAajfUy9Vs2Ve2TnfhQeh1FyM';
    const palette = await getPalette(source);
    const searchResult = await search(palette);
    console.log(palette.map(p => p.hex()));
    console.log(searchResult);
    expect(searchResult).to.be.an('array').that.is.not.empty;
    expect(searchResult[0]).to.have.property('색상').that.contains('핑크');
  });

  it('should pick colors #2', async () => {
    const source = encodeURI('http://mblogthumb2.phinf.naver.net/20160905_245/arame07_1473072358514nrzuN_JPEG/IMG_1529.JPG?type=w800');
    const palette = await getPalette(source);
    const searchResult = await search(palette);
    console.log(palette.map(p => p.hex()));
    console.log(searchResult);
    expect(searchResult).to.be.an('array').that.is.not.empty;
    expect(searchResult[0]).to.have.property('색상').that.contains('오렌지');
  });

  it('should pick colors #3', async () => {
    const source = encodeURI('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7jEBBIVezPiY8stFWlb8Yp7PFxMGZ6JWUeyUeN1r5uvHWRcT7');
    const palette = await getPalette(source);
    const searchResult = await search(palette);
    console.log(palette.map(p => p.hex()));
    console.log(searchResult);
    expect(searchResult).to.be.an('array').that.is.not.empty;
    expect(searchResult[0]).to.have.property('색상').that.contains('기브 인');
  });

  it('should pick colors #4', async () => {
    const source = encodeURI('https://d33ur1yh5ph6b5.cloudfront.net/d30ad420-5e89-11e4-a530-06530c0000b4-mid');
    const palette = await getPalette(source);
    const searchResult = await search(palette);
    console.log(palette.map(p => p.hex()));
    console.log(searchResult);
    expect(searchResult).to.be.an('array').that.is.not.empty;
    expect(searchResult[0]).to.have.property('색상').that.contains('키스미');
  });

});
