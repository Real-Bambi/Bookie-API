import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { bookSchema } from "../schemas/bookSchema.js";

export const getBooks = async(req, res) => {
    try{
        const books = await Book.find();

        // check if no books were found
        if(!books) {
            return res.status(404).json({
                success: false,
                message: 'No books found!'
            })
        }

        //success response
        return res.status(200).json({
            success: true,
            data: books,
            message: 'Books retrieved successfully.'
        })
    } catch(error) {
        //send message to client
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to retrieve books. An unexpected error occured"
        })
    }
}


export const getOneBook = async(req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided 'id' is a valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            
            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }
        // --- End of ID Validation ---

        const book = await Book.findById(id);

        // Check if book was not found (valid ID format, but no matching document)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            data: book,
            message: "Book retrieved successfully."
        });

    } catch (error) {

        // Send a user-friendly message to the client
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve book. An unexpected error occurred.",
            error: error.message 
        });
    }
}

export const postBooks = async(req, res) => {
    try {
        const {error, value} = bookSchema.validate(req.body);
        if (error) {

            return res.status(400).json({
                success: false,
                error: error.details[0].message
            })
        }

        const addBook = await Book.create(value);
        return res.status(201).json({
            sucess: true,
            data: addBook,
            message: "Book added successfully"
        })
    } catch (error) {
        

        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create event. An unexpected error occured"
        })
    }
}

export const updateBooks = async (req, res) => {
     try {
        const { id } = req.params;
        const updateData = req.body; // Data from the request body to update with

        // validate mongoose id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            
            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }

        // Validate the incoming update data against your bookschema
        
        const { error, value } = bookSchema.validate(updateData); //

        if (error) {
           
            return res.status(400).json({
                success: false,
                message: error.details[0].message // Sending only the first error message
            });
        }
        // --- End of Request Body Validation ---

        // Find the event by ID and update it with the validated data
        // { new: true } option tells Mongoose to return the *updated* document
        // { runValidators: true } ensures that any Mongoose schema validators (e.g., minLength)
        // on your model run during the update operation.
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            value, // Use the validated 'value' here
            { new: true, runValidators: true }
        );

        // Check if book was not found for the given ID
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            data: updatedBook,
            message: "Book updated successfully."
        });

    } catch (error) {
        // Log the full error object for server-side debugging
        console.error("Error updating event:", error);
        

        // Send user-friendly message to the client
        return res.status(500).json({
            success: false,
            message: "Failed to update book. An unexpected error occurred.",
            error: error
        });
    }
  
}

export const deleteBooks = async (req, res) => {
     try {
        const { id } = req.params;
        // Check if the provided 'id' is a valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID format."
            });
        }

        const book = await Book.findByIdAndDelete(id);

        // Check if book was not found (and thus, not deleted)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        return res.status(200).json({ // 200 OK is fine for delete
            success: true,
            message: "Book deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete book. An unexpected error occurred.",
        });
    }
}



