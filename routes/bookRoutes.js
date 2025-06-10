import { Router } from "express";
import { getBooks, postBooks, updateBooks, deleteBooks, getOneBook}  from "../controllers/bookController.js";

export const bookRouter = Router();

bookRouter.get("/books", getBooks)
bookRouter.get('/books/:id', getOneBook)
bookRouter.post('/books', postBooks)
bookRouter.put('/books/:id', updateBooks)
bookRouter.delete('/books/:id', deleteBooks)