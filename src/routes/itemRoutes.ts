import { Router } from 'express';
import { addItem, editItem, deleteItem ,getItems} from '../controllers/itemControllers';
import authMiddleware from '../middleware/authmiddleware';

const router = Router();

router.post('/', authMiddleware, addItem);
router.put('/:id', authMiddleware, editItem);
router.delete('/:id', authMiddleware, deleteItem);
router.get('/',getItems) ;

export default router;
