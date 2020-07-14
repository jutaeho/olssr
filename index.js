const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// set view
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`listening on port 4000`));