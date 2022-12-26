import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import styled from 'styled-components';
interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchInput, setSearchInput }: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchIconCSS>
        <SearchIcon />
      </SearchIconCSS>
      <SearchInput type="text" onChange={handleChange} placeholder="검색" />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  margin: 30px 0;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 4px;
  height: 40px;
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchIconCSS = styled.span`
  padding-left: 10px;
`;

const SearchInput = styled.input`
  border: none;
  padding-left: 10px;
  font-size: ${(props) => props.theme.font.size.normal};
  :focus {
    outline: none;
  }
  background-color: transparent;
  width: 350px;
  height: 32px;
`;
