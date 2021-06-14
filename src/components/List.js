import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import tasksController from '../controllers/tasks';
import EditTask from './EditTask';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop:"15px"
  },
  listItem:{
      margin:"10px 0"
  }
}));

export default function TasksList({dashboardData, removeFromTaskList}) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState([0]);
  const [tasksList, setTasks] = React.useState(dashboardData.latestTasks);
  console.log(dashboardData)
  const [editTask, setEditTask] = React.useState(null);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const removeTask = async (taskId)=>{
      await tasksController.removeTask(taskId);
      removeFromTaskList(taskId);
  }

  const editATask = (e, taskId)=>{
    tasksController.editTask(taskId, null, e.target.checked);
    console.log(e.target.isChecked)
  }

  return (
    <>
    {editTask != null && <EditTask taskId={editTask} setEditTask={setEditTask} />}
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <List className={classes.root}>
          {tasksList.map((task, i) => {
              
            const taskId = task["_id"];

            return (
                <div key={taskId}>
                <ListItem key={taskId} role={undefined} dense button onClick={handleToggle(taskId)} className={classes.listItem}>
                    <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(taskId) !== -1 || task.completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={(e)=>{editATask(e,taskId)}}
                    />
                    </ListItemIcon>
                    <ListItemText id={taskId} primary={task.name} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={()=>setEditTask(taskId)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={()=>removeTask(taskId)} >
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {i !== tasksList.length && <Divider variant="middle" />}
              </div>
            );
          })}
        </List>
      </CardContent>
    </Card>
    </>
  );
}