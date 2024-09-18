"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateTransaction = exports.manageTransaction = exports.initiateTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const initiateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { item, seller } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const transaction = new Transaction_1.default({ item, buyer: req.user.id, seller });
        yield transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.initiateTransaction = initiateTransaction;
const manageTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const transaction = yield Transaction_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!transaction)
            return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.manageTransaction = manageTransaction;
const rateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rating, review } = req.body;
    try {
        const transaction = yield Transaction_1.default.findByIdAndUpdate(id, { rating, review }, { new: true });
        if (!transaction)
            return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.rateTransaction = rateTransaction;
