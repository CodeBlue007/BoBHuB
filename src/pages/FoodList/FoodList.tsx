import { useEffect, useState } from 'react';
import axios from 'axios';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import MenuCard from './components/MenuCard';
import Search from './components/Search';
import NavBar from '../../components/NavBar';

const FoodList = () => {

    const [cateData, setCateData] = useState([]);
    const [dataAll, setDataAll] = useState([]);
    const [value, setValue] = useState('one');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        let cateValue = ''
        //카테고리별 api 조회
        switch (newValue) {
            case 'one':
                cateValue = 'All';
                break;
            case 'two':
                cateValue = '한식';
                break;
            case 'three':
                cateValue = '양식';
                break;
            case 'four':
                cateValue = '일식';
                break;
            case 'five':
                cateValue = '분식';
                break;
            case 'six':
                cateValue = '중식';
                break;
            default:
                return null;
        }
        if(cateValue==='All'){
            setCateData(dataAll);
        }
        else{
            const newData = dataAll.filter(({category}) =>category===cateValue);
        
            setCateData((prev)=>[...newData]);
        }
    };

    useEffect(() => {
        async function fetchAPI() {
            const response = await axios.get(`http://localhost:4000/datas`);
            setDataAll(response.data);
            setCateData(response.data);
        }

        fetchAPI();

    }, []);

    return (
        <Container>
            <NavBar />
            <Search />
            <CategoryBox>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" label="All" />
                        <Tab value="two" label="한식" />
                        <Tab value="three" label="양식" />
                        <Tab value="four" label="일식" />
                        <Tab value="five" label="분식" />
                        <Tab value="six" label="중식" />
                    </Tabs>
                </Box>
            </CategoryBox>
            <CardContainer>
                {cateData.map((x, i) => {
                    const { name, category, description, menuList } = x;
                    return <MenuCard title={name} category={category} description={description} menuList={menuList} key={`menucard-${i}`} />
                })}
            </CardContainer>
        </Container>
    )
};

export default FoodList;

const Container = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    margin-bottom:50px;
`

const CategoryBox = styled.div`
    margin-bottom:40px;
`
const CardContainer = styled.div`
    display:grid;
    grid-template-columns:400px 400px 400px;
    grid-column-gap:18px;
    grid-row-gap:32px;
    background-color:#efebf5;
    padding:28px;
`