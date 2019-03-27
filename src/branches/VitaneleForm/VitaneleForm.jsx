import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import {
  Fab,
  Grid,
  IconButton,
  TextField,
  Typography,
  Card,
  List,
  ListItem,
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
  Book,
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

const OldGridView = ({ classes, recipeItem, recipeArray, setValue, handleAppendItem, handleBackspace }) => {
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
            <IconButton color="primary" onClick={handleBackspace}>
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
          <IconButton color="primary" onClick={handleAppendItem}>
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
  handleBackspace,
  handleAppendItem,
  handleAcceptLine,
}) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton color="primary" onClick={handleAcceptLine}>
        {recipeLine.length > 0 ? <CheckIcon /> : <DeleteIcon />}
      </IconButton>
    </ListItemIcon>
    <ListItemText>
      {recipeLine.join(' + ')}
      {recipeLine.length > 0 && (
        <IconButton color="primary" onClick={handleBackspace}>
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
      <IconButton color="primary" onClick={handleAppendItem}>
        <AddIcon />
      </IconButton>
    </ListItemText>
  </ListItem>
);

const VitaneleForm = ({
  classes,
  recipeItem,
  recipeArray,
  itemOnEdit,
  setValue,
  handleAppendItem,
  handleBackspace,
  handleSetItemOnEdit,
  handleAddNewLine,
  handleAcceptLine,
}) => {
  return (
    <Card className={classes.rootCard}>
      <List>
        {recipeArray.map((id, idx) => (
          <React.Fragment key={idx}>
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
                handleBackspace={handleBackspace}
                handleAppendItem={handleAppendItem}
                handleAcceptLine={handleAcceptLine}
              />
            )}
          </React.Fragment>
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
    handleBackspace: ({ setRecipeArray, recipeArray, itemOnEdit }) => () =>
      setRecipeArray(
        recipeArray.map((item, idx) => (idx === itemOnEdit ? recipeArray[idx].slice(0, -1) : recipeArray[idx])),
      ),
    handleAddNewLine: ({ setRecipeArray, setItemOnEdit, recipeArray }) => () => {
      setItemOnEdit(recipeArray.length);
      setRecipeArray([...recipeArray, []]);
    },
    handleAcceptLine: ({ setRecipeArray, setItemOnEdit, recipeArray }) => () => {
      setItemOnEdit(-1);
      setRecipeArray(recipeArray.filter((item) => item.length > 0));
    },
    handleAppendItem: ({ setRecipeItem, setRecipeArray, itemOnEdit, recipeItem, recipeArray }) => () => {
      setRecipeItem('');
      if (recipeItem) {
        setRecipeArray(
          recipeArray.map((item, idx) => (idx === itemOnEdit ? [...recipeArray[idx], recipeItem] : recipeArray[idx])),
        );
      }
    },
  }),
)(VitaneleForm);
