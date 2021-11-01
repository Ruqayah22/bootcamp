const { EntitySchema } = require('typeorm');
const { Author } = require('../models/author')

export default new EntitySchema({
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        age: {
            type: "tinyint",
            nullable: false,
        },
        email: {
            type: "varchar",
            length: 512,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: 70,// Qutaiba
            nullable: false,
        },
        privileges: {
            type: "tinyint", // Amina
            nullable: false,
        },
    },
    name: "author",
    target: Author,
});