import { Schema,model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    author: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    isbn: {
        type: String,
    },
    publicationYear: {
         type: Number,
         
    },
    genre: {
        type: String,
        enum: ["fiction", "history", "science", "romance", "fantasy", "programming"]
    },
    publishingCompany: {
        type: String
    },
    synopsis: {
        type: String,
    } 
    
}, {timestamps: true})

export const Book = model('Book', bookSchema);