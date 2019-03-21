import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import Typography from '@material-ui/core/Typography';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400,
  },
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
  },
};

const Form = ({ classes, title, exercises, setValue, handleCreate, handleDelete }) => {
  return (
    <Paper className={classes.root}>
      <Typography variant="display1" align="center" gutterBottom>
        Exercises
      </Typography>
      <form className={classes.form} onSubmit={handleCreate}>
        <TextField name="title" label="Exercise" value={title} onChange={setValue} margin="normal" />
        <Button type="submit" color="primary" variant="contained">
          Create
        </Button>
      </form>
      <List>
        {exercises.map(({ id, title }) => (
          <ListItem key={id}>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
              <IconButton color="primary" onClick={() => handleDelete(id)}>
                <Delete />{' '}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  withState('title', 'setTitle', ''),
  withState('exercises', 'setExercises', []),
  withHandlers({
    setValue: ({ setTitle }) => ({ target: { value } }) => setTitle(value),
    handleDelete: ({ setExercises, exercises }) => (id) => setExercises(exercises.filter((ex) => ex.id !== id)),
    handleCreate: ({ setTitle, setExercises, title, exercises }) => (e) => {
      e.preventDefault();
      setTitle('');
      if (title) {
        setExercises([
          ...exercises,
          {
            title,
            id: Date.now(),
          },
        ]);
      }
    },
  }),
)(Form);
