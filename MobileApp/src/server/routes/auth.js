/* eslint-disable prettier/prettier */
import express from 'express';

const router = express.Router();

const { signup, signin} = require('../controllers/auth');

router.get("/", (req, res) => {
    return res.json({
        data: "hello world from the API",
    });
});

router.post('/signup', signup);
router.post('/signin', signin);

export default router;