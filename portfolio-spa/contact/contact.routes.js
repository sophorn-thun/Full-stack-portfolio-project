import express, { Router } from 'express';
import { schema } from './contact.schema.js';
import { validate } from '../utils/validate.js'
import * as controller from './contact.controller.js';
import { adminAuth } from '../admin/authorization.js';

export const router = express.Router();

router.post('/messages', validate(schema), controller.sendMessages);
router.get('/messages', adminAuth, controller.getAllMessages);