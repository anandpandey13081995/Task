import React,{useState} from 'react';
import { useHistory } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';

import authController from "../controllers/auth";

const useStyles = makeStyles({
    smallCard:{
        position:"absolute",
        top:"30%",
        right:"42%",
        
        width:"fit-content",
        padding:"10px 40px"
    },
    cardContent:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
    },
    input:{
        marginTop:"10px"
    },
    button:{
        padding:"8px 5px",
        marginTop:"10px"
    }
  });

export default function NoTask() {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    const login = ()=>{
        const userData = {username, password};

        authController
        .login(userData)
        .then((response)=>{
            if(response.status){
                history.push('/dashboard');
            }else{
                setLoginError(true);
            }
        })
        .catch(e=>{
            setLoginError(true);
            console.log(e)
        });
    }


    return (
        <>
            {loginError && <Alert severity="error">Wrong username or password!</Alert>}
            <Card className={classes.smallCard}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                    Login
                    </Typography>
                    <TextField id="outlined-basic" className={classes.input} label="Username" variant="outlined" size="small" onChange={(e)=>{setUsername(e.target.value)}} />
                    <TextField id="outlined-basic" className={classes.input} label="Password" type="password" variant="outlined" size="small" onChange={(e)=>{setPassword(e.target.value)}} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={login}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
