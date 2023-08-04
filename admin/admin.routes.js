import express, { Router } from 'express';
import { schema } from './admin.schema.js';
import { validate } from '../utils/validate.js';
import * as controller from './admin.controller.js';

export const router = express.Router();

router.post('/admins/login', validate(schema), controller.adminLogin)

