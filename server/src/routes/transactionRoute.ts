import express from 'express';
import { createStripePaymentIntent } from '../controllers/transactionController';

const router = express.Router();

router.post('/stripe/payment-intent', createStripePaymentIntent);

export default router;
// This code defines the routes for the course-related API endpoints.