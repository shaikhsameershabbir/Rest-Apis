import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
    res.json({ msg: "AAAgaya bhai" });
});

export default app; 