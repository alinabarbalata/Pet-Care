const express=require('express');
const petRouter=express.Router();
const{createPet}=require('../routers/controllers/petController');
const verifyToken=require('../middleware/authMiddleware');

petRouter.post('/pets',verifyToken,createPet);

module.exports=petRouter;