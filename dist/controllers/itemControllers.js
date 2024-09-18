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
exports.getItems = exports.deleteItem = exports.editItem = exports.addItem = exports.createItem = void 0;
const Item_1 = __importDefault(require("../models/Item"));
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description, price, image } = req.body;
    try {
        const item = new Item_1.default({ name, description, price, image, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        yield item.save();
        res.status(201).json(item);
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
exports.addItem = addItem;
const editItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, image } = req.body;
    try {
        const item = yield Item_1.default.findByIdAndUpdate(id, { name, description, price, image }, { new: true });
        if (!item)
            return res.status(404).json({ message: 'Item not found' });
        res.json(item);
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
exports.editItem = editItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const item = yield Item_1.default.findByIdAndDelete(id);
        if (!item)
            return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
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
exports.deleteItem = deleteItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sort, filter } = req.query;
    let query = {};
    if (search) {
        query = Object.assign(Object.assign({}, query), { name: { $regex: search, $options: 'i' } });
    }
    if (filter) {
        query = Object.assign(Object.assign({}, query), JSON.parse(filter));
    }
    try {
        const items = yield Item_1.default.find(query).sort(sort ? JSON.parse(sort) : {});
        res.json(items);
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
exports.getItems = getItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description, price, image } = req.body;
    const item = new Item_1.default({ name, description, price, image, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
    try {
        const savedItem = yield item.save();
        res.status(201).json(savedItem);
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
exports.createItem = createItem;
