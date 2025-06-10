import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'string.empty': 'Title cannot be empty.',
            'any.required': 'Title is required.'
        }),

    author: Joi.string()
        .required()
        .messages({
            'string.empty': 'Author cannot be empty.',
            'any.required': 'Author is required.'
        }),

    image: Joi.string()
        .uri() // Assumes 'image' is a URL, you might want to add .allow('') if it can be an empty string
        .optional()
        .messages({
            'string.uri': 'Image must be a valid URL.'
        }),

    isbn: Joi.string()
        .pattern(/^(?:ISBN(?:-13)?:?)(?=[0-9]{13}$)([0-9]{3}-){2}[0-9]{3}[0-9X]$|^[0-9]{10}$/) // Basic ISBN-10regex
        .optional()
        .messages({
            'string.pattern.base': 'ISBN must be a valid ISBN-10 format.'
        }),

    publicationYear: Joi.number()
        .integer()
        .min(1000) // Assuming publication year is at least 1000
        .max(new Date().getFullYear() + 5) // Assuming max is current year + a few years for future publications
        .optional()
        .messages({
            'number.base': 'Publication year must be a number.',
            'number.integer': 'Publication year must be an integer.',
            'number.min': 'Publication year cannot be before {{#limit}}.',
            'number.max': 'Publication year cannot be in the far future.'
        }),

    genre: Joi.string()
        .valid("fiction", "history", "science", "romance", "fantasy", "programming")
        .optional()
        .messages({
            'any.only': 'Genre must be one of "fiction", "programming", "history", "science", "romance", or "fantasy".'
        }),

    publishingCompany: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Publishing company cannot be empty.'
        }),

    synopsis: Joi.string()
        .optional()
        .messages({
            'string.empty': 'Synopsis cannot be empty.'
        }),


});

