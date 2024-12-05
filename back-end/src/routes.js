import express from 'express';

const routes = express.Router();

routes.post('/login', (req, res) => {
    res.send('Login endpoint');
});

export default routes;
