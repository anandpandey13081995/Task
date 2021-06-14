const router = require('express').Router();
const jwt = require('jsonwebtoken');

const authenticationController = require('../controllers/authentication');
const authCheck = require('../middlewares/authentication');

router.post('/register',(req,res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    authenticationController.register({name, username, password}).then((response)=>{
        res.json(response);
    }).catch((errorResponse)=>{
        res.json(errorResponse);

    });
});

router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    authenticationController.login({username, password}).then((response)=>{
        
        if(!response.status) return res.json({status: response.status});
        const {_id, username, name} = response.user;
        const user = {id: _id, name, username};
        
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.cookie('authorization', accessToken);
        res.json({ status:response.status,id: _id, username,accessToken });
    }).catch((e)=>{
        console.log("some error ano", e);
        res.json({status:false});
    });    
});

router.get('/logout',(req,res)=>{
    res.cookie('authorization', null);
    res.json({status:true});
})

router.post('/userInfo', authCheck.authUser, (req,res)=>{
    res.json(req.user);
});

module.exports = router;