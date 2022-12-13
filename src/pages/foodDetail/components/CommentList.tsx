import styled from 'styled-components';
import { Avatar} from '@mui/material';


const ListContainer = styled.div`
    display : flex;

`


function CommentList(){

    return (
        <ListContainer>
            <Avatar alt="Remy Sharp" src="/img/chickfood.jpg" />
        </ListContainer>
    )

}

export default CommentList;