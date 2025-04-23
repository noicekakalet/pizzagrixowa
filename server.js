const express = require('express');
const path = require('path');
const app = express();

const PORT = 3001;
const HOST = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Serwer działa na http://${HOST}:${PORT}`);
}); 