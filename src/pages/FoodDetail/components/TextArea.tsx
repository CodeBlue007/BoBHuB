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
resize: none;

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
    canRevise : boolean;
    setRevise : React.Dispatch<React.SetStateAction<boolean>>;
    setReadOnly : React.Dispatch<React.SetStateAction<boolean>>;
}

const TextArea = ({content,canRevise,setRevise,setReadOnly}:TextAreaProps ) => {

    const [textValue, setTextValue] = useState<string>(content);

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setTextValue(e.target.value);
    }
    const reviseEnd = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(textValue === ""){
            alert("댓글을 입력해주세요");
            return;
        }
        setRevise(false);
        setReadOnly(true);
    }

    return(
    <TextContainer>
    <CommentArea value={textValue} onChange={handleChange} disabled={!canRevise}/>
    {canRevise && <Button onClick={reviseEnd}>수정완료</Button>}
    </TextContainer> 
    )

}


export default TextArea;
