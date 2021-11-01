import * as express from 'express';
// import { join } from 'path';
import * as multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/Users/mohammadnawfal/Desktop/Fikra Camp/V2/W5/public/images')
            // cb(null, path.join(__dirname, '..', '..', 'public', 'images'))
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
        }
    })
});

const router = express.Router();

const { getBooks, getBookById, createNewBook, deleteBook, updateBook } = require('../controllers/Book');

router.get('/:bookId', getBookById)
router.delete('/:bookId', deleteBook)

router.get('/', getBooks);

// router.use(express.json());
router.use(upload.single('image'));

router.post('/', createNewBook)
router.put('/:bookId', updateBook);

export default router;