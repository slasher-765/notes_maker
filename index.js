const express = require('express');
const path =require('path');
const fs = require('fs');
const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');



// this code is just to create a file name in the backend or server it wont write description to it
app.post('/create', (req, res) => {
    
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err) {
        res.redirect('/');
    });
}
);
// this block of code says whenever user clicks create in browser then call the function
// or here in this code create a file with the name of title and write the title in the file and then redirect to / route
// index.ejs will take us to the /create route and then fs.write function will work and it will cerate a file with the name of title in backend or server 
// and write the title in the file and then redirect to / route




// // this code is to read data from file and render it in the index2.ejs file and index2.ejs file will display the files in the browser
// app.get('/', (req, res) => {
//     fs.readdir('./files', (err, files) => { // we are reading the files from the files directory IF yes we will render index.ejs
//         res.render('index2.ejs',{files: files});// first one is name of variable in ejs file, second one is the value that we are passing
//     })  // in the index.ejs we are sending files variable which contains the files in the files directory
// });
// // this code or get function says whenever user goes to / route in browser then call the function or here in this code read the files from directory and render the index2.ejs file with the files array
// // basically get is used to read data from the server
// // post is used to send data to the server


const filesDir = path.join(__dirname, 'files');

fs.mkdir(filesDir, { recursive: true }, () => {
    fs.readdir(filesDir, (err, files) => {
        if (err || !files) {
            return res.render('index2.ejs', { files: [] });
        }
        res.render('index2.ejs', { files: files });
    });
});




// this code will work when we click read more..
// this code is to read description data from file and render it in the index3.ejs file and index3.ejs file will display the description 
// of the file in the browser in the another route
app.get('/', (req, res) => {
    const filesDir = path.join(__dirname, 'files');

    // Ensure the "files" folder exists before reading it
    fs.mkdir(filesDir, { recursive: true }, (err) => {
        if (err) {
            console.error('Failed to create directory:', err);
            return res.render('index2.ejs', { files: [] });
        }

        fs.readdir(filesDir, (err, files) => {
            if (err) {
                console.error('Failed to read directory:', err);
                return res.render('index2.ejs', { files: [] });
            }

            res.render('index2.ejs', { files: files });
        });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

