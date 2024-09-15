import express from 'express';
import cors from 'cors';
import { checkSchema } from 'express-validator';
import configureDB from './config/db.js'

// Importing controllers
import userController from './app/controller/userCltr.js';

// Importing validators
import { userValidationSchema, userIdValidationSchema } from './app/validators/userValidator.js';


const app = express();
const port = 3333;
configureDB()

// Middleware setup
app.use(cors());
app.use(express.json());

// User routes setup

app.get('/api/users/:id', checkSchema(userIdValidationSchema), userController.show);
app.get('/api/users', userController.list);

// Start the server
app.listen(port, () => {
  console.log(`Server running on : ${port}`);
});
