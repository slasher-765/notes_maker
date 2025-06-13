const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Handle file creation from form
app.post('/create', (req, res) => {
    const fileName = req.body.title.split(' ').join('');
    const content = req.body.details;

    fs.writeFile(`./files/${fileName}.txt`, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
        res.redirect('/');
    });
});

// Handle homepage — list all files
app.get('/', (req, res) => {
    const filesDir = path.join(__dirname, 'files');

    fs.mkdir(filesDir, { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
            console.error("Failed to create directory:", mkdirErr);
            return res.render('index2.ejs', { files: [] });
        }

        fs.readdir(filesDir, (readErr, files) => {
            if (readErr) {
                console.error("Failed to read directory:", readErr);
                return res.render('index2.ejs', { files: [] });
            }

            res.render('index2.ejs', { files });
        });
    });
});

// Handle individual file view
app.get('/files/:filename', (req, res) => {
    const filePath = `./files/${req.params.filename}`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('File not found');
        }

        res.render('index3.ejs', {
            title: req.params.filename,
            description: data
        });
    });
});

// Use dynamic port for Render or fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});