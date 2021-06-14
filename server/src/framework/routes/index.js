const router = require('express').Router();

const authenticationRouter = require('./authentication');
const taskRouter = require('./tasks');
const dashboardRouter = require('./dashboard');

const authCheck = require('../middlewares/authentication');

router.get('/',(req,res)=>{
    res.json({
        status:true,
        message:"working"
    });
});

router.use('/auth', authenticationRouter);
router.use('/tasks', authCheck.authUser, taskRouter);
router.use('/dashboard', authCheck.authUser, dashboardRouter);

module.exports = router;