const Jimp = require("jimp");
const sharp = require("sharp");

console.time("jimp create");

const jimpFrame = new Jimp(4200, 4800, 0x0, (err, image) => {
  image.write("jimpImg.png");
});

console.timeEnd("jimp create");

console.time("sharp create");

const makeSharpFrame = async () => {
  const newFrame = await sharp({
    create: {
      width: 4200,
      height: 4800,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0.5 }
    }
  }).toFile("sharpImg.png");
};

const resizeSharpFrame = async () => {
  await makeSharpFrame().then(() => {
    sharp("sharpImg.png")
      .extend({
        top: 0,
        bottom: 900,
        left: 250,
        right: 250,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .toFile("sharpImgResized.png");
  });
};

resizeSharpFrame();

console.timeEnd("sharp create");
