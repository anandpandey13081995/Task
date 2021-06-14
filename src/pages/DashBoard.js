import {useEffect, useState} from "react";
import NoTask from '../components/NoTask';
import Header from '../components/Header';

import tasks from "../controllers/tasks";

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import PlusIcon from '@material-ui/icons/Add';

import List from '../components/List';
import AddTask from '../components/AddTask';

function useForceUpdate(){
  const [value, setValue] = useState(0);
  console.log("something")
  return () => setValue(value => value+1);
}

const useStyles = makeStyles((theme) => ({
  flex:{
      display:"flex",
      gap:"10px",
      alignItems:"center"
  },
  header:{
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
      marginTop:"20px"
  },
  searchField: {
    padding: '1px 2px',
    display: 'flex',
    alignItems: 'center',
    width: 250,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  button:{
      padding:"8px 20px",
  }
}));

function DashBoard() {
  const classes = useStyles();
  const [dashboardData, setDashboardData] = useState({taskCompleted:0,totalTask:0, latestTasks:[]});
  const [haveAnyTask, setHaveAnyTask] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [newTask, setNewTask] = React.useState(false);

  const forceUpdate = useForceUpdate();

  useEffect( () => {

    (async function(){
      const response = await tasks.getDashboard();
      
      setDashboardData(response.data);
      if(response.data.latestTasks.length > 0 ) setHaveAnyTask(true);
    })();

    return () => {
    }
  }, [updated]);

  const addToTaskList = (newTask)=>{
    setDashboardData({
      taskCompleted: dashboardData.taskCompleted + 1,
      totalTask: dashboardData.totalTask + 1,
      latestTasks: [...dashboardData.latestTasks, newTask]
    });
    setHaveAnyTask(true);
    setUpdated(true);
    forceUpdate();
  }

  const removeFromTaskList = (taskId)=>{
    const newTasksList = [];
    for (let index = 0; index < dashboardData.latestTasks.length; index++) {
      const task = dashboardData.latestTasks[index];
      if(task["_id"] != taskId) newTasksList.push(task)   
    }

    console.log(dashboardData.latestTasks, newTasksList)
    setDashboardData({
      taskCompleted: dashboardData.taskCompleted ,
      totalTask: dashboardData.totalTask - 1,
      latestTasks: newTasksList
    });
    setUpdated(true);
    forceUpdate();
  }

  const setNewTaskAndAdd = (task)=>{
    setNewTask(false);
    addToTaskList(task);
    setHaveAnyTask(true);
  }

    return (
      <div className="container">
        <Header />
        {
          haveAnyTask && dashboardData ? 
            <div>
                {newTask && <AddTask setNewTask={setNewTaskAndAdd} />}
                <div className={classes.header}>
                    <Typography variant="h5">Tasks</Typography>
                    <div className={classes.flex}>
                        <TextField id="outlined-basic" label="Search by task name" variant="outlined" size="small" />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<PlusIcon />}
                            onClick={()=>setNewTask(true)}
                        >
                            New Task
                        </Button>
                    </div>
                </div>
                <List dashboardData={dashboardData} removeFromTaskList={removeFromTaskList} />
            </div>
            :
            <NoTask taskHandler={addToTaskList} />
        }
      </div>
    );
  
}

export default DashBoard;
