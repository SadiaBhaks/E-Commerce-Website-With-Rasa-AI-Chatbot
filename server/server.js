import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';
import pool from './db.js'; // MySQL connection pool
import authRoutes from './Routes/auth.js'; // Auth routes

dotenv.config();

const app = express();

// -------------------- CORS --------------------
// Allow requests from any origin (frontend hosted anywhere)
app.use(cors({ origin: "*" }));

// Middleware
app.use(express.json());

// -------------------- Serve uploaded images --------------------
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// -------------------- Multer + Sharp setup --------------------
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    const filename = Date.now() + path.extname(req.file.originalname);
    const filepath = path.join(uploadDir, filename);

    await sharp(req.file.buffer).resize(400, 300).toFile(filepath);

    // Use actual backend URL in deployment
    const imageUrl = `${process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 4000}`}/uploads/${filename}`;
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
    res.json(rows[0]);
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
app.use('/api/auth', authRoutes);

// -------------------- Start server --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Backend URL: ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`);
});

