const express = require('express');
const path = require('path');

let app = express();

// set view
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.set('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.end('hello server');
    // res.render(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(4000, () => console.log(`listening on port 4000`));