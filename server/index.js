const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();
const uploadToDrive = require('./upload-to-drive');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../client')));

app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const uploadedFiles = req.files;
    for (const file of uploadedFiles) {
      await uploadToDrive(file.path, file.originalname, file.mimetype);
      fs.unlinkSync(file.path);
    }
    res.json({ message: 'Upload thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi upload' });
  }
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));