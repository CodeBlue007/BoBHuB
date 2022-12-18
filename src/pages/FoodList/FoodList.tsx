import { useEffect, useState } from 'react';
import * as API from '../FoodList/API';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import MenuCard from './components/MenuCard';
import Search from './components/Search';
import NavBar from '../../components/NavBar';

const FoodList = () => {

    const [categoryFoodList, setCategoryFoodList] = useState([]); //카테고리별 식당데이터
    const [foodList, setFoodList] = useState([]); //전체 식당데이터 
    const [value, setValue] = useState('one');

    const handleChange = (event: React.SyntheticEvent, categoryNum: string) => {
        setValue(categoryNum);

        let cateValue = ''
        switch (categoryNum) {
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
        if (cateValue === 'All') {
            setCategoryFoodList(foodList);
        }
        else {
            const newData = foodList.filter(({ category }) => category === cateValue);
            setCategoryFoodList((prev) => [...newData]);
        }
    };

    // 식당전체조회 api
    const getFoodListAPI = async () => {
        const result = await API.get(`http://localhost:4000/shops`);
        setFoodList(result);
        setCategoryFoodList(result);
    }

    useEffect(() => {
        try {
            getFoodListAPI();
        } catch (err) {
            console.error(err);
        }
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
                {categoryFoodList.map((x, i) => {
                    const { name, category, description, menuList, starAverage } = x;
                    return <MenuCard name={name} category={category} description={description} menuList={menuList} starAverage={starAverage} key={`menucard-${i}`} />
                })}
                <MenuCard />
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