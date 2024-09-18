import { Schema, model, Document } from 'mongoose';

interface ITransaction extends Document {
  item: Schema.Types.ObjectId;
  buyer: Schema.Types.ObjectId;
  seller: Schema.Types.ObjectId;
  status: string;
  rating: number;
  review: string;
}

const transactionSchema = new Schema<ITransaction>({
  item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String }
});
const Transaction = model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
