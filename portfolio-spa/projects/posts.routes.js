import express, { Router } from 'express';
import * as controller from './posts.controller.js';
import { adminAuth } from '../admin/authorization.js';

export const router = express.Router();

router.get('/posts', controller.getAllPosts);
router.get('/posts/:id', controller.getPostById);
router.patch('/posts/:id', adminAuth, controller.updatePost);
router.post('/posts', adminAuth, controller.createPost);
router.delete('/posts/:id', adminAuth, controller.deletePost);