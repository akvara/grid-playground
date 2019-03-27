import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import {
  Fab,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  Card,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

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
  recipeInput: {
    minWidth: 50,
    maxWidth: 90,
  },
};

const OldGridView = ({ classes, recipeItem, recipeArray, setValue, handleCreate, handleDelete }) => {
  const isWithData = recipeArray.length > 0;
  return (
    <Grid item container>
      <Grid item xs={3} className={classes.actionsBlock}>
        {!isWithData && (
          <IconButton color="primary">
            <CancelIcon />
          </IconButton>
        )}
        {isWithData && (
          <Fab color="primary" size="small">
            <CheckIcon />
          </Fab>
        )}
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2" align="center" gutterBottom>
          {recipeArray.join(' + ')}
          {isWithData && (
            <IconButton color="primary" onClick={handleDelete}>
              <ArrowBackIcon />
            </IconButton>
            // <Fab size="small" type="submit" color="primary">
            //   <AddIcon />
            // </Fab>
          )}
          <TextField
            name="recipeItem"
            className={classes.recipeInput}
            value={recipeItem}
            onChange={setValue}
            margin="normal"
          />
          <IconButton color="primary" onClick={handleCreate}>
            <AddIcon />
          </IconButton>
        </Typography>
      </Grid>
    </Grid>
  );
};

const LineShow = ({ recipeLine, idx, handleSetItemOnEdit }) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton onClick={() => handleSetItemOnEdit(idx)}>
        <EditIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText>{recipeLine.join(' + ')}</ListItemText>
  </ListItem>
);

const LineAdd = ({ idx, handleAddNewLine }) => (
  <ListItem key={'new'}>
    <ListItemIcon>
      <IconButton onClick={handleAddNewLine}>
        <AddIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText />
  </ListItem>
);

const LineEdit = ({
  idx,
  classes,
  recipeLine,
  recipeItem,
  setValue,
  handleDelete,
  handleCreate,
  handleSetItemOnEdit,
                    handleAddNewLine,
}) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton color="primary" onClick={() => handleSetItemOnEdit(-1)}>
        {recipeLine.length > 0 ? <CheckIcon /> : <DeleteIcon />}
      </IconButton>
    </ListItemIcon>
    <ListItemText>
      {recipeLine.join(' + ')}
      {recipeLine.length > 0 && (
        <IconButton color="primary" onClick={handleDelete}>
          <ArrowBackIcon />
        </IconButton>
      )}
      <TextField
        name="recipeItem"
        className={classes.recipeInput}
        value={recipeItem}
        onChange={setValue}
        margin="normal"
      />
      <IconButton color="primary" onClick={handleCreate}>
        <AddIcon />
      </IconButton>
    </ListItemText>
  </ListItem>
);

const FormWithState = ({
  classes,
  recipeItem,
  recipeArray,
  itemOnEdit,
  setValue,
  handleCreate,
  handleDelete,
  handleSetItemOnEdit,
                         handleAddNewLine
}) => {
  console.log('-****- itemOnEdit', itemOnEdit);
  console.log('-****- recipeArray', recipeArray);

  return (
    <Card className={classes.rootCard}>
      <List>
        {recipeArray.map((id, idx) => (
          <>
            {idx !== itemOnEdit && (
              <LineShow idx={idx} recipeLine={recipeArray[idx]} handleSetItemOnEdit={handleSetItemOnEdit} />
            )}
            {idx === itemOnEdit && (
              <LineEdit
                idx={idx}
                classes={classes}
                recipeLine={recipeArray[idx]}
                recipeItem={recipeItem}
                setValue={setValue}
                handleDelete={handleDelete}
                handleCreate={handleCreate}
                handleSetItemOnEdit={handleSetItemOnEdit}
              />
            )}
          </>
        ))}
        {itemOnEdit === -1 && <LineAdd idx={recipeArray.length} handleAddNewLine={handleAddNewLine} />}
      </List>
    </Card>
  );
};

export default compose(
  withStyles(styles),
  withState('recipeItem', 'setRecipeItem', ''),
  withState('recipeArray', 'setRecipeArray', [[]]),
  withState('itemOnEdit', 'setItemOnEdit', 0),
  withHandlers({
    setValue: ({ setRecipeItem }) => ({ target: { value } }) => setRecipeItem(value),
    handleSetItemOnEdit: ({ setItemOnEdit }) => (idx) => setItemOnEdit(idx),
    handleDelete: ({ setRecipeArray, recipeArray, itemOnEdit }) => () =>
      setRecipeArray(
        recipeArray.map((item, idx) => (idx === itemOnEdit ? recipeArray[idx].slice(0, -1) : recipeArray[idx])),
      ),
    handleAddNewLine: ({ setRecipeArray, setItemOnEdit, recipeArray }) => () => {
      setItemOnEdit(recipeArray.length);
      setRecipeArray([...recipeArray, []]);
    },

    handleCreate: ({ setRecipeItem, setRecipeArray, itemOnEdit, recipeItem, recipeArray }) => () => {
      setRecipeItem('');
      if (recipeItem) {
        setRecipeArray(
          recipeArray.map((item, idx) => (idx === itemOnEdit ? [...recipeArray[idx], recipeItem] : recipeArray[idx])),
        );
      }
    },
  }),
)(FormWithState);
