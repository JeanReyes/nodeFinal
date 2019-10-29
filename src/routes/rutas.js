const express = require('express');
//import express from 'express';
const router = express.Router();

router.get('/hola', (req, res)=>{
    res.send("hola mundo");
});

module.exports = router;