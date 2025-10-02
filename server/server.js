import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';
import pool from './db.js'; // MySQL connection pool
import authRoutes from './routes/auth.js'; // Auth routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// -------------------- Multer + Sharp setup --------------------
const storage = multer.memoryStorage(); // store in memory temporarily
const upload = multer({ storage });

// Upload endpoint (resizes to 400x300)
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Ensure uploads folder exists
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    // Unique filename
    const filename = Date.now() + path.extname(req.file.originalname);
    const filepath = path.join(uploadDir, filename);

    // Resize and save image
    await sharp(req.file.buffer).resize(400, 300).toFile(filepath);

    const imageUrl = `http://localhost:${process.env.PORT || 4000}/uploads/${filename}`;
    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// -------------------- Item endpoints --------------------

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json(rows[0]); // { "result": 2 }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Add new item
app.post('/api/items', async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO items (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, image_url]
    );
    res.json({ id: result.insertId, name, description, price, stock, image_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// -------------------- Auth Routes --------------------
// All auth routes will be under /api/auth (register, login)
app.use('/api/auth', authRoutes);

// -------------------- Start server --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


