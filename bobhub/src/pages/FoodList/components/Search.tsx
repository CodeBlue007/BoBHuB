import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import styled from 'styled-components';

const Search = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    return (
        <SearchContainer>
            <SearchIconCSS>
                <SearchIcon />
            </SearchIconCSS>
            
            <SearchInput type='text' onChange={handleChange} placeholder='검색' />
            {/* <p>{searchInput}</p> */}
        </SearchContainer>
    )
}

export default Search;

const SearchContainer=styled.div`
    margin:30px 0;
    box-sizing: border-box;
    border: 1px solid #C9CACC;
    border-radius: 4px;
    height:40px;
    width:400px;

    display:flex;
    flex-deriction:row;
    align-items:center;
`
const SearchIconCSS=styled.span`
    padding-left:10px;
    
`

const SearchInput=styled.input`
      border:none;
      padding-left:10px;
      font-size:14px;
`