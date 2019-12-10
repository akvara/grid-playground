import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import {
  Button,
  ButtonGroup,
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
import { Add as AddIcon, Cancel as CancelIcon, Check as CheckIcon, Edit as EditIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
// import { LineShow } from './LineShow/LineShow';

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
    width: '80%',
    // minWidth: 50,
    // maxWidth: 90,
  },
};

const LINE_SEPARATOR = '[|]';
// const ITEM_SEPARATOR = '[+]';

const initialArray = [
  'TB 8sb@kg + 10V + Eliumenas R@KK10g+1G tg@MM',
  'COL. 10v + PIUR PIGMENT 2Lasai orang',
  'sampunas +2lasai violeto piur pigment',
];

const recipeLinesToString = (recipe: string[]) => recipe.join(LINE_SEPARATOR);
const stringToRecipeLines = (str: string) => str.split(LINE_SEPARATOR);

const LineShow = ({ recipeLine, idx, setLineOnEditHandler }: any) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton onClick={() => setLineOnEditHandler(idx)}>
        <EditIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText onClick={() => setLineOnEditHandler(idx)}>{recipeLine}</ListItemText>
  </ListItem>
);

const LineAdd = ({ idx, newLineHandler }: any) => (
  <ListItem key={'new'}>
    <ListItemIcon>
      <IconButton onClick={newLineHandler}>
        <AddIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText />
  </ListItem>
);

const SpeedText = ({ addTextHandler, text, withPlus }: any) => (
  <Button size="small" variant="outlined" onClick={() => addTextHandler(text, withPlus)}>
    {text}
  </Button>
);

const LineEdit = ({
  idx,
  classes,
  recipeLine,
  setValue,
  acceptLineHandler,
  cancelEditHandler,
  addTextHandler,
}: any) => (
  <>
    {/*<ListItem>*/}
      <ButtonGroup size="small" variant="outlined">
        <SpeedText addTextHandler={addTextHandler} text={'Eliumenas '} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'TB '} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'Color.'} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'Piur pigment'} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'lašai'} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'violet.'} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'orang.'} withPlus={true} />
        <SpeedText addTextHandler={addTextHandler} text={'g.'} />
        <SpeedText addTextHandler={addTextHandler} text={'kg'} />
        <SpeedText addTextHandler={addTextHandler} text={' + '} />
        <SpeedText addTextHandler={addTextHandler} text={'@'} />
      </ButtonGroup>
    <ButtonGroup size="small" variant="outlined">
      <SpeedText addTextHandler={addTextHandler} text={'0'} />
      <SpeedText addTextHandler={addTextHandler} text={'1'} />
      <SpeedText addTextHandler={addTextHandler} text={'2'} />
      <SpeedText addTextHandler={addTextHandler} text={'3'} />
      <SpeedText addTextHandler={addTextHandler} text={'4'} />
      <SpeedText addTextHandler={addTextHandler} text={'5'} />
      <SpeedText addTextHandler={addTextHandler} text={'6'} />
      <SpeedText addTextHandler={addTextHandler} text={'7'} />
      <SpeedText addTextHandler={addTextHandler} text={'8'} />
      <SpeedText addTextHandler={addTextHandler} text={'9'} />

    </ButtonGroup>

    {/*</ListItem>*/}

    <ListItem key={idx}>
      <ListItemText>
        <TextField
          name="recipeItem"
          className={classes.recipeInput}
          value={recipeLine}
          onChange={setValue}
          margin="normal"
        />
        <IconButton color="primary" onClick={acceptLineHandler}>
          <CheckIcon />
        </IconButton>
        <IconButton color="primary" onClick={cancelEditHandler}>
          <CancelIcon />
        </IconButton>
      </ListItemText>
    </ListItem>
  </>
);

const VitaneleForm = ({
  classes,
  recipeItem,
  recipeLinesArray,
  lineOnEdit,
  recipeLine,
  setValue,
  handleAppendItem,
  handleBackspace,
  setLineOnEdit,
  setLineOnEditHandler,
  acceptLineHandler,
  cancelEditHandler,
  newLineHandler,
  addTextHandler,
}: any) => {
  return (
    <Card className={classes.rootCard}>
      <CardHeader title={recipeLinesToString(recipeLinesArray)} />
      <CardContent>
        <List>
          {recipeLinesArray.map((line: string, idx: number) => (
            <React.Fragment key={idx}>
              {idx !== lineOnEdit && (
                <LineShow idx={idx} recipeLine={line} setLineOnEditHandler={setLineOnEditHandler} />
              )}
              {idx === lineOnEdit && (
                <LineEdit
                  idx={idx}
                  classes={classes}
                  recipeLine={recipeLine}
                  setValue={setValue}
                  acceptLineHandler={acceptLineHandler}
                  cancelEditHandler={cancelEditHandler}
                  addTextHandler={addTextHandler}
                />
              )}
            </React.Fragment>
          ))}
          {lineOnEdit === -1 && <LineAdd newLineHandler={newLineHandler} />}
        </List>
      </CardContent>
    </Card>
  );
};

export default compose(
  withStyles(styles),
  withState('lineOnEdit', 'setLineOnEdit', -1),
  withState('recipeLine', 'setRecipeLine', ''),
  withState('recipeLinesArray', 'setRecipeArray', stringToRecipeLines(recipeLinesToString(initialArray))),
  withHandlers({
    setValue: ({ setRecipeLine }: any) => ({ target: { value } }: any) => setRecipeLine(value),
    setLineOnEditHandler: ({ setLineOnEdit, setRecipeLine, recipeLinesArray }: any) => (idx: number) => {
      setRecipeLine(recipeLinesArray[idx]);
      setLineOnEdit(idx);
    },
    acceptLineHandler: ({ setRecipeArray, setLineOnEdit, lineOnEdit, recipeLine, recipeLinesArray }: any) => () => {
      setLineOnEdit(-1);
      recipeLinesArray[lineOnEdit] = recipeLine;
      setRecipeArray(recipeLinesArray.filter((item: string) => item.length > 0));
    },
    cancelEditHandler: ({ setRecipeArray, setLineOnEdit, recipeLinesArray }: any) => () => {
      setLineOnEdit(-1);
      setRecipeArray(recipeLinesArray.filter((item: string) => item.length > 0));
    },
    newLineHandler: ({ setRecipeArray, setLineOnEdit, recipeLinesArray }: any) => () => {
      setRecipeArray([...recipeLinesArray, []]);
      setLineOnEdit(recipeLinesArray.length);
    },
    addTextHandler: ({ setRecipeLine, recipeLine }: any) => (text: string, withPlus: boolean) => {
      console.log('-****- withPlus', withPlus);
      console.log('-****- recipeLine', recipeLine);
      console.log('-****- length', recipeLine.length);
      const separator = recipeLine.length > 0 && withPlus ? ' + ' : '';

      setRecipeLine(`${recipeLine}${separator}${text}`);
    },
  }),
)(VitaneleForm);
