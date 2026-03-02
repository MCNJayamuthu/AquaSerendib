import { Request, Response } from 'express';
import { createSupportMessage } from '../services/support.service';

export const submitSupportMessage = async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body;

    await createSupportMessage(email, message);

    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to submit message',
      error: error.message,
    });
  }
};