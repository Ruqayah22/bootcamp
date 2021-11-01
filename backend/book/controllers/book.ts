import { Request, Response, NextFunction } from 'express';

import model, { Book } from '../models/Book';
const { getBooks: getBooksModel, addBook, getBookById: getBookByIdModel, deleteBook: deleteBookModel, updateBook: updateBookModel } = model;


function getBooks(req: Request, res: Response, next: NextFunction) {
    getBooksModel().then((books: Book[]) => res.json(books));
}

function getBookById(req: Request, res: Response, next: NextFunction) {
    getBookByIdModel(+req.params.bookId).then((book: Book | undefined) => {
        res.json(book ? book :
            { message: "No book found" }
        )
    });
}

function deleteBook(req: Request, res: Response, next: NextFunction) {
    deleteBookModel(+req.params.bookId).then((book) => {
        res.json(book)
    });
}

function createNewBook(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.title)
        return res.status(400).json({ message: "Your title is required" })
    if (body.title.length < 3)
        return res.status(400).json({ message: "Your title is too short" })
    if (!body.price)
        return res.status(400).json({ message: "Your price is required" })
    if (body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })
    if ((!body.authorId) || (isNaN(parseInt(body.authorId))))
        return res.status(400).json({ message: "Not valid author id" })

    addBook({ ...body, imagePath: req.file!.path }).then(
        (book: Book | { message: string }) => res.json(book)
    );
}

function updateBook(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.title && !body.price)
        return res.status(400).json({ message: "No data provided" })
    if (body.title && body.title.length < 3)
        return res.status(400).json({ message: "Your title is too short" })
    if (body.price && body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })


    updateBookModel(+req.params.BookId, body).then((book: Book | undefined) => res.json(book ? book :
        { message: "No book found" }
    ))
}

export {
    getBooks,
    getBookById,
    createNewBook,
    deleteBook,
    updateBook,
}