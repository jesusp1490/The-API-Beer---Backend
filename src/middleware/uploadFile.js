const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();


// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware para cargar la imagen en Cloudinary
const uploadImageToCloudinary = (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Error al cargar la imagen', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No se ha proporcionado ninguna imagen' });
        }

        const image = req.file.buffer.toString('base64');

        // Subir imagen a Cloudinary
        cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${image}`, (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Error al cargar la imagen en Cloudinary', error: error });
            }

            // Agregar la URL de la imagen a la solicitud
            req.body.imageUrl = result.secure_url;
            next();
        });
    });
};

module.exports = {
    uploadImageToCloudinary
};
