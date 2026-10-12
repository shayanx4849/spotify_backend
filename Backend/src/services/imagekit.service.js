import { ImageKit } from "@imagekit/nodejs";

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const response = await imageKitClient.files.upload({
    file: file,
    fileName: `muisc_ ${Date.now()}`,
    folder: "spotify/music",
  });

  return response;
}

export default uploadFile;
