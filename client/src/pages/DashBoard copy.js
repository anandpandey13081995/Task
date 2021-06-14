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

export default class DashBoard extends React.Component {
  classes = useStyles();

  constructor(props){
    super(props);

    this.state={
      dashboardData:{taskCompleted:0,totalTask:0, latestTasks:[]},
      haveAnyTask:false,
      updated:false,
      newTask:false
    }
  }


  componentDidMount(){

    (async function(){
      const response = await tasks.getDashboard();
      
      const haveTask = response.data.latestTasks.length > 0 ;
      this.setState({
        dashboardData:response.data,
        haveAnyTask:haveTask
      });
    })();
  }

  addToTaskList = (newTask)=>{
    this.setState({
      dashboardData:{
        taskCompleted: this.state.dashboardData.taskCompleted + 1,
        totalTask: this.state.dashboardData.totalTask + 1,
        latestTasks: [...this.state.dashboardData.latestTasks, newTask]
      },
      haveAnyTask:true,
      updated:true
    });
  }

  removeFromTaskList = (taskId)=>{
    const newTasksList = [];
    for (let index = 0; index < this.state.dashboardData.latestTasks.length; index++) {
      const task = this.state.dashboardData.latestTasks[index];
      if(task["_id"] != taskId) newTasksList.push(task)   
    }

    this.setState({
      dashboardData:{
        taskCompleted: this.state.dashboardData.taskCompleted,
        totalTask: this.state.dashboardData.totalTask - 1,
        latestTasks: newTasksList
      },
      haveAnyTask:true,
      updated:true
    });
  }

  setNewTaskAndAdd = (task)=>{
    
    this.addToTaskList(task);
    
    this.setState({
      newTask:false,
      haveAnyTask:true
    })
  }
  render(){
    return (
      <div className="container">
        <Header />
        {
          this.state.haveAnyTask && this.state.dashboardData ? 
            <div>
                {this.state.newTask && <AddTask setNewTask={this.setNewTaskAndAdd} />}
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
                            onClick={()=>this.setNewTask(true)}
                        >
                            New Task
                        </Button>
                    </div>
                </div>
                <List dashboardData={this.state.dashboardData} removeFromTaskList={this.removeFromTaskList} />
            </div>
            :
            <NoTask taskHandler={this.addToTaskList} />
        }
      </div>
    )
      }
}

