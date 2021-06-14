const router = require('express').Router();
const dashboardController = require('../controllers/dashboard');

router.get('/', async (req,res)=>{
    const userId = req.user.id;
    try{
        const response = await dashboardController.get(userId);
        res.json({
            status:true,
            data:response
        });
    }catch(e){
        res.json({
            status:false,
            message:"Something went wrong"+e
        })
    }
});

module.exports = router;