import { Schema, model, Document } from 'mongoose';

interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  user: Schema.Types.ObjectId;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Item = model<IItem>('Item', itemSchema);
export default Item;
