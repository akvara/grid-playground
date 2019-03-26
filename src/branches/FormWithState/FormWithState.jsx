import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import { Fab, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
// import Delete from '@material-ui/icons/Delete';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    margin: 4,
    padding: 4,
    maxWidth: 400,
  },
  form: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  actionsBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const FormWithState = ({ classes, recipeItem, recipeArray, setValue, handleCreate, handleDelete }) => {
  const isWithData = recipeArray.length > 0;
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="body2" align="center" gutterBottom>
            {recipeArray.join(' + ')}
            {isWithData && (
              <IconButton color="primary" onClick={() => handleDelete()}>
                <ArrowBackIcon />
              </IconButton>
              // <Fab size="small" type="submit" color="primary">
              //   <AddIcon />
              // </Fab>
            )}
          </Typography>
          <form className={classes.form} onSubmit={handleCreate}>
            <TextField name="recipeItem" value={recipeItem} onChange={setValue} margin="normal" />
            <IconButton type="submit" color="primary">
              <AddIcon />
            </IconButton>
            {/*<Fab size="small" type="submit" color="primary">*/}
            {/*<AddIcon />*/}
            {/*</Fab>*/}
          </form>
        </Grid>
        <Grid item xs={3} className={classes.actionsBlock}>
          {!isWithData && (
            <IconButton color="primary" size="small">
              <CancelIcon />
            </IconButton>
          )}
          {isWithData && (
            <Fab color="primary" size="small">
              <CheckIcon />
            </Fab>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  withState('recipeItem', 'setRecipeItem', ''),
  withState('recipeArray', 'setRecipeArray', []),
  withHandlers({
    setValue: ({ setRecipeItem }) => ({ target: { value } }) => setRecipeItem(value),
    handleDelete: ({ setRecipeArray, recipeArray }) => () => setRecipeArray(recipeArray.slice(0, -1)),
    handleCreate: ({ setRecipeItem, setRecipeArray, recipeItem, recipeArray }) => (e) => {
      e.preventDefault();
      setRecipeItem('');
      if (recipeItem) {
        setRecipeArray([...recipeArray, recipeItem]);
      }
    },
  }),
)(FormWithState);
