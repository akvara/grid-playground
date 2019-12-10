import * as React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

export const LineShow = ({ recipeLine, idx, setLineOnEditHandler }: any) => (
  <ListItem key={idx}>
    <ListItemIcon>
      <IconButton onClick={() => setLineOnEditHandler(idx)}>
        <EditIcon />
      </IconButton>
    </ListItemIcon>
    <ListItemText>{recipeLine}</ListItemText>
  </ListItem>
);
