import * as React from 'react';
import { useState } from 'react';

import { Button, TextField } from '@material-ui/core';

const SortForm = () => {
  const [stateValue, setStateValue] = useState('');

  const sortAction = () => {
    const stringsArray = stateValue
      .split(',')
      .map((item) =>
        item
          .trim()
          .replace(/'/g, '')
          .replace(/"/g, ''),
      )
      .filter(Boolean);

    const sortedArray = Array.from(new Set([...stringsArray])).sort();

    const finalArray = sortedArray.map((item) => `'${item}'`).join(',\n');
    setStateValue(finalArray);
  };

  return (
    <>
      <div>
        <TextField
          multiline
          value={stateValue}
          onChange={({ target: { value } }) => {
            setStateValue(value);
          }}
        />
      </div>
      <Button onClick={sortAction}>Sort</Button>
    </>
  );
};

export default SortForm;
