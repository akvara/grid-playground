import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
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

const LINE_SEPARATOR = '[|]';
const ITEM_SEPARATOR = '[+]';
const initialArray = [['20gr top 9N', '2gr col 5BG'], ['top 10V']];
const recipeToString = (recipe) => recipe.map((item) => item.join(ITEM_SEPARATOR)).join(LINE_SEPARATOR);
const stringToRecipe = (str) => str.split(LINE_SEPARATOR).map((item) => item.split(ITEM_SEPARATOR));

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
      <CardHeader title={recipeToString(recipeArray)} />
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default compose(
  withStyles(styles),
  withState('recipeItem', 'setRecipeItem', ''),
  withState('recipeArray', 'setRecipeArray', stringToRecipe(recipeToString(initialArray))),
  withState('itemOnEdit', 'setItemOnEdit', initialArray[0].length > 0 ? -1 : 0),
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
