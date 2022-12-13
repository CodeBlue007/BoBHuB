import styled from 'styled-components';
import { Avatar} from '@mui/material';
import { NumberLiteralType } from 'typescript';

const FlexContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-around;
`;

const ListContainer = styled.div`
    display : flex;
    box-shadow: 2px 2px 2px gray;
    width: 50vw;
    border-radius: 10px;
    padding : 10px;
    background-color: crimson;
`

interface CommentList{
    commentProp : {
        commnetId : number;
        userId : number,
        shopId : number,
        content : string,
        star : number,
    }
}

function CommentList({commentProp:{commnetId,userId,shopId,content,star}}:CommentList){

    return (
        <ListContainer>
            <Avatar alt="Remy Sharp" src="/img/chickfood.jpg" />
        </ListContainer>
    )

}

export default CommentList;