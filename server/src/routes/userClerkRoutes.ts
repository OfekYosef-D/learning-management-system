import express from 'express';
import { updateUser } from '../controllers/userClerkController';

const router = express.Router();

router.get('/:userId', updateUser); // Update user metadata by userId

export default router;
// This code defines the routes for the course-related API endpoints.