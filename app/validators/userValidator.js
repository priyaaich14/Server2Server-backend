import { body, param } from 'express-validator';

export const userValidationSchema = {
    name: {
        in: ['body'],
        errorMessage: 'Name is required',
        isLength: {
            options: { min: 2 }
        }
    },
    email: {
        in: ['body'],
        errorMessage: 'Valid email is required',
        isEmail: true
    },
    city: {
        in: ['body'],
        optional: true,
        errorMessage: 'City must be a string',
        isString: true
    }
};

export const userIdValidationSchema = {
    id: {
        in: ['params'],
        errorMessage: 'Valid user ID is required',
        isMongoId: true
    }
};
