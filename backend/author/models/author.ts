import { compare, hash } from 'bcrypt';

import { getRepository } from 'typeorm';


export class Author {
    name: string;
    age: number;
    email: string;
    password: string;
    privileges: number;

    constructor(name: string, age: number, email: string, password: string) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
        this.privileges = 0;
        if (`${this.email}`.endsWith('@edu.iq'))
            this.privileges = 1;
    }

    static copyFromData = (name: string, age: number, email: string, password: string): Author =>
        new Author(name, age, email, password);

    toString = (): string =>
        `${this.name} ${this.age}`;
}




const authorService = (): {
    addAuthor: Function,
    getAuthors: Function,
    getAuthorById: Function,
    getAuthorByCredentials: Function,
    deleteAuthor: Function,
    updateAuthor: Function,
} => {

    async function addAuthor(value: {
        name: string,
        email: string,
        password: string,
        age: number,
    }, authorRepository = getRepository(Author)): Promise<Author | { message: string }> {
        try {
            const password = await hash(value.password, 7)
            return (await authorRepository.save(new Author(value.name, value.age, value.email, password)));
        } catch (err) {
            return { message: `${err}` }
        }
    }

    const getAuthors =
        (authorRepository = getRepository(Author)): Promise<Author[]> => authorRepository.find();

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorById = (id: number, authorRepository =
        getRepository(Author)): Promise<Author | undefined> => authorRepository.findOne(id);

    //////////////////////////////////////////////////////////////////////////////////////////

    const getAuthorByCredentials =
        async ({ email, password }: { email: string, password: string }, authorRepository =
            getRepository(Author)): Promise<Author | undefined> => {
            const author = await authorRepository.findOne({ where: { email } });
            if ((!author) || (!(await compare(password, author!.password)))) {
                return undefined;
            }
            return author;
        };

    //////////////////////////////////////////////////////////////////////////////////////////

    const deleteAuthor =
        async (id: number, authorRepository = getRepository(Author)) => {
            return await authorRepository.delete(id);
        }

    //////////////////////////////////////////////////////////////////////////////////////////

    const updateAuthor =
        async (id: number, updatedAuthor: {
            name: string,
            age: number,
            password: string,
        }, authorRepository = getRepository(Author)) => {
            //     return await authorRepository.query('Update author set name = ":name" , age = ":age" , password = ":password"  where id = :id ', {
            //         name: updatedAuthor.name,
            //         age: updatedAuthor.age,
            //         password: updatedAuthor.password,
            //         id: id,
            //     })

            const author = await getAuthorById(id);
            if (!author) {
                return undefined;
            }
            if (updatedAuthor.name) author!.name = updatedAuthor.name;
            if (updatedAuthor.age) author!.age = updatedAuthor.age;
            if (updatedAuthor.password) author!.password = updatedAuthor.password;

            return await authorRepository.save(author!)
        }


    return {
        addAuthor,
        getAuthors,
        getAuthorById,
        getAuthorByCredentials,
        deleteAuthor,
        updateAuthor,
    };
}





export default authorService();
    // getAuthors,
    // getAuthorById,
    // addAuthor,
    // deleteAuthor,
    // updateAuthor,
    // getAuthorByCredentials,
