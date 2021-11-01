import { json, Router } from 'express';

const router = Router();

const { getAuthors, getAuthorById, createNewAuthor, deleteAuthor, updateAuthor } = require('../controllers/author');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/:authorId', getAuthorById)
router.delete('/:authorId', deleteAuthor)

router.get('/', getAuthors);

router.use(json());

router.post('/',
    isAdmin,
    createNewAuthor)
router.put('/:authorId', updateAuthor);

export default router;