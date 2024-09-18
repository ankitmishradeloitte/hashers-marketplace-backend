import { Request, Response } from 'express';
import Item from '../models/Item';

const addItem = async (req: Request, res: Response) => {
  const { name, description, price, image } = req.body;
  try {
    const item = new Item({ name, description, price, image, user: req.user?.id });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

const editItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(id, { name, description, price, image }, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

const getItems = async (req: Request, res: Response) => {
  const { search, sort, filter } = req.query;
  let query = {};
  if (search) {
    query = { ...query, name: { $regex: search, $options: 'i' } };
  }
  if (filter) {
    query = { ...query, ...JSON.parse(filter as string) };
  }
  try {
    const items = await Item.find(query).sort(sort ? JSON.parse(sort as string) : {});
    res.json(items);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, description, price, image } = req.body;
  const item = new Item({ name, description, price, image, user: req.user?.id });

  try {
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }  }
};


export { addItem, editItem, deleteItem , getItems };
