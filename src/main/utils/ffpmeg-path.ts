const pathToFfmpeg = require("ffmpeg-static");
// Fix production issue of ffmpeg-static
const fixPath = (path: string) => path.replace("app.asar", "app.asar.unpacked");
export const getFfpmpegPath = () => {
  return fixPath(pathToFfmpeg);
};
