import model, { Author } from '../models/author';


const { getAuthors: getAuthorsModel, addAuthor, getAuthorById: getAuthorByIdModel, deleteAuthor: deleteAuthorModel, updateAuthor: updateAuthorModel } = model;


import { Request, Response, NextFunction } from 'express';

function getAuthors(req: Request, res: Response, next: NextFunction) {
    getAuthorsModel().then((authors: Author) => res.json(authors));
}

function getAuthorById(req: Request, res: Response, next: NextFunction) {
    getAuthorByIdModel(req.params.authorId).then((authors: Author[]) => {
        res.status(authors ? 200 : 404).json(authors ? authors : {
            message: "No author found"
        })
    });
}

function deleteAuthor(req: Request, res: Response, next: NextFunction) {
    deleteAuthorModel(req.params.authorId).then(
        (deletedAuthor: any) => {
            res.status(deletedAuthor ? 202 : 404).json(deletedAuthor ? deletedAuthor :
                { message: 'Author not found' });
        }
    )
}

async function createNewAuthor(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (!body.name)
        return res.status(400).json({ message: "Your name is required" })
    if (body.name.length < 3)
        return res.status(400).json({ message: "Your name is too short" })
    if (!body.age)
        return res.status(400).json({ message: "Your age is required" })
    if (body.age < 15)
        return res.status(400).json({ message: "You are too young" })
    if (!body.email)
        return res.status(400).json({ message: "Your email is required" })
    if ((body.email.length < 3) || (body.email.indexOf("@") === -1))
        return res.status(400).json({ message: "Your email is invalid" })
    if (!body.password)
        return res.status(400).json({ message: "Your password is required" })
    if (body.password.length < 8)
        return res.status(400).json({ message: "Your password is too short" })

    await addAuthor(body).then((author: Author) => {
        res.json(author);
    })
}

function updateAuthor(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if ((body.name) && (body.name.length < 3))
        return res.status(400).json({ message: "Your name is too short" })
    if ((body.age) && (body.age < 15))
        return res.status(400).json({ message: "You are too young" })
    if ((body.password) && (body.password.length < 8))
        return res.status(400).json({ message: "Your password is too short" })

    updateAuthorModel(req.params.authorId, body).then(
        (updatedAuthor: Author | undefined) => {
            res.status(updatedAuthor ? 200 : 404).json(updatedAuthor ? updatedAuthor :
                { message: "No author found" });
        });
}

export {
    getAuthors,
    getAuthorById,
    createNewAuthor,
    deleteAuthor,
    updateAuthor,
}