// All routes
import { Router } from 'express';

import { router as adminRoutes } from './admin/admin.routes.js';
import { router as postsRoutes } from './projects/posts.routes.js';
import { router as messageRoutes } from './contact/contact.routes.js';

export const router = Router();

router.use('/', adminRoutes);
router.use('/', postsRoutes);
router.use('/', messageRoutes);
