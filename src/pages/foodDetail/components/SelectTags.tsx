import styled from 'styled-components';
import { NativeSelect, InputLabel } from '@mui/material';

const SelectContainer = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
  align-items: center;
`;

interface selectInterface {
  type: string;
}

function SelectTags({ type }: selectInterface) {
  const optionData = type === 'People' ? [2, 3, 4] : [15, 30, 45, 60];

  const optionTags = () => {
    return optionData.map((data,idx) => {
      const text = type === "People"? `${data}명` : `${data}분`;
      return <option value={data} key={`${data}${idx}`}>{text}</option>
    })
  };

  return (
    <SelectContainer>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {type}
      </InputLabel>
      <NativeSelect
        defaultValue={optionData[0]}
        inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}>
        {optionTags()}
      </NativeSelect>
    </SelectContainer>
  );
}

export default SelectTags;
