import express from "express";
import multer from "multer";
import musicContoller from "../controllers/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post(
  "/create",
  authMiddleware.authArtist,
  upload.single("music"),
  musicContoller.createMusic,
);
router.post("/album", authMiddleware.authArtist, musicContoller.createAlbum);
router.get("/", authMiddleware.authUser, musicContoller.getAllMusics);
router.get("/album", authMiddleware.authUser, musicContoller.getAllAlbum);
router.get(
  "/album/:ablumId",
  authMiddleware.authUser,
  musicContoller.getAlbumById,
);

export default router;
