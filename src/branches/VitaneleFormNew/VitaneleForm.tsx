import * as React from 'react';
import { compose, withHandlers, withState } from 'recompose';

import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Add as AddIcon, Cancel as CancelIcon, Check as CheckIcon, Edit as EditIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 4,
    padding: 4,
    maxWidth: 720,
  },
  recipeInput: {
    width: '80%',
  },
};

const LINE_SEPARATOR = '[|]';

const initialArray = [
  'TB 8sb@kg + 10V + Eliumenas R@KK10g+1G tg@MM',
  'COL. 10v + PIUR PIGMENT 2Lasai orang',
  'sampunas +2lasai violeto piur pigment',
];

const recipeLinesToString = (recipe: string[]) => recipe.join(LINE_SEPARATOR);
const stringToRecipeLines = (str: string) => str.split(LINE_SEPARATOR);
interface VitaneleFormHandlers {
  setValue: ({ target: { value } }: any) => void;
  setLineOnEditHandler: (idx: number) => void;
  acceptLineHandler: () => void;
  cancelEditHandler: () => void;
  newLineHandler: () => void;
  addTextHandler: (text: string) => void;
}

interface VitaneleFormStateHandlers {
  setLineOnEdit: (idx: number) => void;
  setRecipeLine: (text: string) => void;
  setRecipeArray: (arr: string[]) => void;
}

interface VitaneleFormState {
  lineOnEdit: number;
  recipeLine: string;
  recipeLinesArray: string[];
}

interface VitaneleFormPrivateProps extends VitaneleFormStateHandlers, VitaneleFormHandlers, VitaneleFormState {
  classes: any;
}

const LineShow = ({ recipeLine, idx, setLineOnEditHandler }: any) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton onClick={() => setLineOnEditHandler(idx)}>
        <EditIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText>{recipeLine}</ListItemText>
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

// const SpeedText = ({ addTextHandler, text, withPlus }: any) => (
//   <Button size="small" variant="outlined" onClick={() => addTextHandler(text, withPlus)}>
//     {text}
//   </Button>
// );

const LineEdit = ({
  idx,
  classes,
  recipeLine,
  setValue,
  acceptLineHandler,
  cancelEditHandler,
  addTextHandler,
}: any) => (
  <Grid container>
    <Grid item container>
      <Grid item xs={12}>
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={() => addTextHandler('Elium. ')}>Elium. </Button>
          <Button onClick={() => addTextHandler('TB ')}>TB </Button>
          <Button onClick={() => addTextHandler('Color.')}>Color.</Button>
          <Button onClick={() => addTextHandler('Shamp.')}>shamp.</Button>
          <Button onClick={() => addTextHandler('drops ')}>drops</Button>
          <Button onClick={() => addTextHandler('Pure pigm. ')}>Pure pigm.</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
    <Grid item container>
      <Grid item xs={12}>
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={() => addTextHandler('red ')}>red</Button>
          <Button onClick={() => addTextHandler('yellow ')}>yellow</Button>
          <Button onClick={() => addTextHandler('orang ')}>orang</Button>
          <Button onClick={() => addTextHandler('green ')}>green</Button>
          <Button onClick={() => addTextHandler('blue ')}>blue</Button>
          <Button onClick={() => addTextHandler('violet ')}>violet</Button>
          <Button onClick={() => addTextHandler('warm viol. ')}>warm viol.</Button>
          <Button onClick={() => addTextHandler('cold viol. ')}>cold viol.</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
    <Grid item container>
      <Grid item xs={12}>
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={() => addTextHandler('1')}>1</Button>
          <Button onClick={() => addTextHandler('2')}>2</Button>
          <Button onClick={() => addTextHandler('3')}>3</Button>
          <Button onClick={() => addTextHandler('4')}>4</Button>
          <Button onClick={() => addTextHandler('5')}>5</Button>
          <Button onClick={() => addTextHandler('6')}>6</Button>
          <Button onClick={() => addTextHandler('7')}>7</Button>
          <Button onClick={() => addTextHandler('8')}>8</Button>
          <Button onClick={() => addTextHandler('9')}>9</Button>
          <Button onClick={() => addTextHandler('0')}>0</Button>
        </ButtonGroup>
        <Grid item container>
          <Grid item xs={12}></Grid>
        </Grid>
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={() => addTextHandler('%')}>%</Button>
          <Button onClick={() => addTextHandler('@')}>@</Button>
          <Button onClick={() => addTextHandler(' + ')}> + </Button>
          <Button onClick={() => addTextHandler(' ')}> </Button>
          <Button onClick={() => addTextHandler('ml')}>ml</Button>
          <Button onClick={() => addTextHandler('g')}>g</Button>
          <Button onClick={() => addTextHandler('kg')}>kg</Button>
        </ButtonGroup>{' '}
      </Grid>
    </Grid>
    <Grid item container>
      <Grid item xs={12}>
        <ButtonGroup size="small" variant="outlined">
          <Button onClick={() => addTextHandler('V')}>V</Button>
          <Button onClick={() => addTextHandler('SB')}>SB</Button>
          <Button onClick={() => addTextHandler('R')}>R</Button>
          <Button onClick={() => addTextHandler('KK')}>KK</Button>
          <Button onClick={() => addTextHandler('MM')}>MM</Button>
          <Button onClick={() => addTextHandler('TG')}>TG</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
    <Grid item container>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  </Grid>
);

const VitaneleForm = ({
  classes,
  recipeLinesArray,
  lineOnEdit,
  recipeLine,
  setValue,
  setLineOnEdit,
  setLineOnEditHandler,
  acceptLineHandler,
  cancelEditHandler,
  newLineHandler,
  addTextHandler,
}: VitaneleFormPrivateProps) => {
  return (
    <Card className={classes.root}>
      {/*<CardHeader title={recipeLinesToString(recipeLinesArray)}  />*/}
      {/*<Hidden xsDown>*/}
      {/*<Paper className={classes.paper}>{recipeLinesToString(recipeLinesArray)}</Paper>*/}
      {/*</Hidden>*/}
      <CardContent>
        <List>
          {recipeLinesArray.map((line, idx) => (
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

const normalizeLine = (str: string) => str.replace(/\+/g, ' + ').replace(/\s+/g, ' ');

export default compose<VitaneleFormPrivateProps, {}>(
  withStyles(styles),
  withState('lineOnEdit', 'setLineOnEdit', -1),
  withState('recipeLine', 'setRecipeLine', ''),
  withState('recipeLinesArray', 'setRecipeArray', stringToRecipeLines(recipeLinesToString(initialArray))),
  withHandlers<VitaneleFormPrivateProps, VitaneleFormHandlers>({
    setValue: ({ setRecipeLine }: any) => ({ target: { value } }) => setRecipeLine(value),
    setLineOnEditHandler: ({ setLineOnEdit, setRecipeLine, recipeLinesArray }) => (idx: number) => {
      setRecipeLine(recipeLinesArray[idx]);
      setLineOnEdit(idx);
    },
    acceptLineHandler: ({ setRecipeArray, setLineOnEdit, lineOnEdit, recipeLine, recipeLinesArray }) => () => {
      setLineOnEdit(-1);
      recipeLinesArray[lineOnEdit] = normalizeLine(recipeLine);
      setRecipeArray(recipeLinesArray.filter((item: string) => item.length > 0));
    },
    cancelEditHandler: ({ setRecipeLine, setRecipeArray, setLineOnEdit, recipeLinesArray }) => () => {
      setRecipeLine('');
      setLineOnEdit(-1);
      setRecipeArray(recipeLinesArray.filter((item: string) => item.length > 0));
    },
    newLineHandler: ({ setRecipeArray, setLineOnEdit, recipeLinesArray }) => () => {
      // console.log('-****- recipeLinesArray', recipeLinesArray);
      setLineOnEdit(recipeLinesArray.length);
      setRecipeArray([...recipeLinesArray, '']);
    },
    addTextHandler: ({ setRecipeLine, recipeLine }) => (text: string) => {
      // const separator = recipeLine.length > 0 && withPlus ? ' + ' : '';
      setRecipeLine(`${recipeLine}${text}`);
    },
  }),
)(VitaneleForm);
