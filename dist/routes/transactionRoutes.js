"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionControllers_1 = require("../controllers/transactionControllers");
const authmiddleware_1 = __importDefault(require("../middleware/authmiddleware"));
const router = (0, express_1.Router)();
router.post('/', authmiddleware_1.default, transactionControllers_1.initiateTransaction);
router.put('/:id', authmiddleware_1.default, transactionControllers_1.manageTransaction);
router.put('/:id/rate', authmiddleware_1.default, transactionControllers_1.rateTransaction);
exports.default = router;
