"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    item: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Item', required: true },
    buyer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String }
});
const Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
exports.default = Transaction;
