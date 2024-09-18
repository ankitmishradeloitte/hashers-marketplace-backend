import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

const initiateTransaction = async (req: AuthRequest, res: Response) => {
  const { item, seller } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const transaction = new Transaction({ item, buyer: req.user.id, seller });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

const manageTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, { status }, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};
const rateTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, review } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, { rating, review }, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }  }
};

export { initiateTransaction, manageTransaction, rateTransaction };

