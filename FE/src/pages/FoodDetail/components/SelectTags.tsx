import styled from 'styled-components';
import { NativeSelect, InputLabel } from '@mui/material';
import { FlexContainer } from '../../../styles/GlobalStyle';
import React from 'react';

const SelectContainer = styled(FlexContainer)`
  width: 150px;
  margin: 15px;
`;

interface selectProps {
  type: '모집인원';
  value: number;
  setValue: (x: number) => void;
}

const SelectTags = ({ type, value, setValue }: selectProps) => {
  const optionData = [2, 3, 4];

  const optionTags = () => {
    return optionData.map((data, idx) => {
      const text = `${data}명`;
      return (
        <option value={data} key={`${data}${idx}`}>
          {text}
        </option>
      );
    });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setValue(parseInt(e.target.value));

  return (
    <SelectContainer>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {type}
      </InputLabel>
      <NativeSelect
        defaultValue={value}
        inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}
        onChange={handleSelect}>
        {optionTags()}
      </NativeSelect>
    </SelectContainer>
  );
};

export default React.memo(SelectTags);
