import { DeleteResult, getRepository, Repository } from 'typeorm';
import authorModel from '../../author/models/author';

export class Book {
    title: string;
    price: number;
    imagePath: string;
    authorId: number;

    constructor(title: string, price: number, imagePath: string, authorId: number) {
        this.title = title;
        this.price = price;
        this.imagePath = imagePath;
        this.authorId = authorId;
    }

    static copyFromData = (title: string, price: number, imagePath: string, authorId: number) =>
        new Book(title, price, imagePath, authorId);

    toString = () =>
        `${this.title}: ${this.price}, written by ${this.authorId}`;
}


const bookService = () => {

    async function addBook(value: {
        title: string,
        price: number,
        imagePath: string,
        authorId: number,
    }, bookRepository: Repository<Book> = getRepository('Book')):
        Promise<Book | { message: string }> {
        if (!authorModel.getAuthorById(value.authorId))
            return ({ message: "Author not found", })
        const book = Book.copyFromData(
            value.title,
            value.price,
            value.imagePath,
            value.authorId);
        return await bookRepository.save(book);
    }

    const getBooks = async (bookRepository: Repository<Book> = getRepository('Book')) => await bookRepository.find();
    const getBookById = async (id: number, bookRepository: Repository<Book> = getRepository('Book')) => await bookRepository.findOne(id);
    const deleteBook = async (id: number, bookRepository: Repository<Book> = getRepository('Book')): Promise<DeleteResult | undefined> => await bookRepository.delete(id);
    const updateBook = async (id: number, updatedBook: {
        title: string,
        price: number,
    }, bookRepository: Repository<Book> = getRepository('Book')): Promise<Book | undefined> => {
        const book = await getBookById(id);
        if (!book)
            return undefined;
        if (updatedBook.title) book!.title = updatedBook.title;
        if (updatedBook.price) book!.price = updatedBook.price;
        return await bookRepository.save(book!)
    }


    return {
        addBook,
        getBooks,
        getBookById,
        deleteBook,
        updateBook,
    };
}

export default bookService();