import express from 'express';

const router = express.Router();

router.get('/status',(req,res)=>{
    res.status(200).json({ message: 'Already to use '})
})

export const APIs_v1 = router
