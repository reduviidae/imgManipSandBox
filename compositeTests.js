const Jimp = require('jimp');
const sharp = require('sharp');

console.time('jimp composite')

let jimpSmall = new Jimp('./4200x4800.png', (err, img) => {
  err && console.log(err)
  return img.opacity(1)
})

let jimpBig = async () => {await Jimp.read('4500x5700.png')}

(jimpBig) => {
  jimpBig.composite(jimpSmall, 141, 0, [{
    mode: Jimp.BLEND_MULTIPLY,
    opacitySource: 1,
    opacityDest: 1
  }])
  let file = "jimpTestOverlap.png"
  jimpBig.write(file)
}

console.timeEnd('jimp composite')

console.time('sharp composite')

sharp('4500x5700.png')
  .composite([{input: '4200x4800.png', top: 0, left: 141}])
  .toFile('sharpTestOverlap.png', (err, info) => { err && console.log(err) })

console.timeEnd('sharp composite')
