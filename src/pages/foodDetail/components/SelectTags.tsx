import styled from 'styled-components';
import { NativeSelect, InputLabel } from '@mui/material';

const SelectContainer = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
  align-items: center;
  margin : 15px;
`;

interface selectInterface {
  type: "People" | "Duration";
  value : number;
  setValue : (x:number) => void;
}

const SelectTags = ({ type, value, setValue}: selectInterface) => {
  const optionData = type === 'People' ? [2, 3, 4] : [15, 30, 45, 60];

  const optionTags = () => {
    return optionData.map((data,idx) => {
      const text = type === "People"? `${data}명` : `${data}분`;
      return <option value={data} key={`${data}${idx}`}>{text}</option>
    })
  };

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => setValue(parseInt(e.target.value));
  

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
}

export default SelectTags;
