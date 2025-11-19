// middlewares/upload.js
import multer from 'multer';
import path from 'path';

// Configurar dónde se almacenarán las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/categories/'); // carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
