import jwt from "jsonwebtoken";
import musicModel from "../models/music.model.js";
import uploadFile from "../services/imagekit.service.js";
import albumModel from "../models/album.model.js";

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res
        .status(400)
        .json({ message: "Title and music file are required" });
    }

    const result = await uploadFile(file.buffer.toString("base64"));
    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    return res
      .status(201)
      .json({ message: "Music created successfully", music });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create music" });
  }
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;
  if (!title || (musics !== undefined && !Array.isArray(musics))) {
    return res.status(400).json({
      message: "A title is required and musics must be an array of music IDs",
    });
  }

  try {
    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics,
    });

    return res
      .status(201)
      .json({ message: "Album created successfully", album });
  } catch (err) {
    console.error("Failed to create album:", err.message);

    return res.status(500).json({ message: "Failed to create album" });
  }
}

async function getAllMusics(req, res) {
  const musics = await musicModel.find().populate("artist", "username email");

  res.status(200).json({ message: "Musics fetched sucessfully", musics });
}

async function getAllAlbum(req, res) {
  const allAlbum = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  res.status(200).json({ message: "album fetch secessfully", allAlbum });
}

async function getAlbumById(req, res) {
  const albumID = req.params.albumId;

  const album = await albumModel
    .find(albumID)
    .populate("artist", "username email")
    .populate("musics");

  return res.status(200).json({
    message: "Album fetched successfully",
    album,
  });
}

export default {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbum,
  getAlbumById,
};
