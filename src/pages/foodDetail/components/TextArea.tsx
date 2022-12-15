import { useState } from "react";
import styled from "styled-components";


const TextContainer = styled.div`
    display : flex;
    flex-direction: column;

`

const Button = styled.button`
background-color: crimson;
width : 60px;
font-size: 10px;
cursor: pointer;
color : white;

&:hover{
    background-color: black;
}

`
const CommentArea = styled.textarea`
margin-top: 10px;
background-color: crimson;
color : white;
border: none;
border-bottom: 1px solid white;
box-sizing: border-box;
font-size: 15px;
height: 55px;

&:focus{
  outline : none;
}

&:disabled {
  font-weight: bold;
  color: black;
  border: none;
}
`;

interface TextAreaProps{
    content: string;
    setTextValue : React.Dispatch<React.SetStateAction<string>>;
    canRevise : boolean;
    setRevise : React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea = ({content, setTextValue,canRevise,setRevise}:TextAreaProps ) => {



    const reviseEnd = (e:React.MouseEvent<HTMLButtonElement>) => {
        setRevise(false);
    }

    return(
    <TextContainer>
    <CommentArea disabled>{content}</CommentArea>
    {canRevise && <Button onClick={reviseEnd}>수정완료</Button>}
    </TextContainer> 
    )

}


export default TextArea;