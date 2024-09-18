"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemControllers_1 = require("../controllers/itemControllers");
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const router = (0, express_1.Router)();
router.post('/', authmiddleware_1.default, itemControllers_1.addItem);
router.put('/:id', authmiddleware_1.default, itemControllers_1.editItem);
router.delete('/:id', authmiddleware_1.default, itemControllers_1.deleteItem);
router.get('/', itemControllers_1.getItems);
exports.default = router;
