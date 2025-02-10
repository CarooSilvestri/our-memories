import express from 'express';
import { getDailyMemories, uploadImage } from './controller';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
export const upload = multer({ storage });

router.get('/memo', getDailyMemories);
router.post('/upload', upload.single('file'), uploadImage);

export default router;
