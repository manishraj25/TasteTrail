import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// ✅ Properly load CommonJS module
const storageModule = require("multer-storage-cloudinary");
const CloudinaryStorage =
  storageModule.CloudinaryStorage ||
  storageModule.default ||
  storageModule;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "TasteTrail/Recipes",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

export default upload;

