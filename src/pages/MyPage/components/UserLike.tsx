import MenuCard from '../../FoodList/components/MenuCard';
import styled from 'styled-components';
import { useEffect,useState} from 'react';
import axios from 'axios';
import { response } from 'express';

type LikeProps = {
    title: string;
    category: string;
    description: string;
    menuList: string[];
    custom:boolean;
}

const defaultProps = {
    title: '좋아요식당이름1',
    category: '한식',
    description: '식당설명란입니다.',
    menuList: ['대표메뉴1', '대표메뉴2', '대표메뉴3'],
    custom:true,
}

const UserLike=({ title, category, description, menuList,custom}: LikeProps & typeof defaultProps)=>{
    const [likeData,setLikeData]=useState([]);
    useEffect(() => {
        async function fetchAPI() {
            const response = await axios.get(`http://localhost:4000/datas`);
            setLikeData(response.data);
        }
        fetchAPI();
    }, []);

    return(
        <LikeList>
            {likeData.map((d,i)=>{
                return <MenuCard />
            })}
            
        </LikeList>
    )
}

UserLike.defaultProps = defaultProps;
export default UserLike;

const LikeList=styled.div`
    display:grid;
    grid-template-columns:400px 400px 400px;
    grid-column-gap:18px;
    grid-row-gap:32px;
`
