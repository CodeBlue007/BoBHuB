import { Fragment, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  IconButton,
} from '@mui/material';
import { FoodType } from './Foods';
import FoodModal from './FoodModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

let selectFood: FoodType | undefined;

interface FoodTableProps {
  foods: FoodType[];
  setFoodsData: () => void;
}

const FoodTable = ({ foods, setFoodsData }: FoodTableProps) => {
  const [open, setOpen] = useState(false);
  const [btnState, setBtnState] = useState('');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const rowData = foods.map(({ name, distance, id, description, like, address, category }) => {
    return { name, distance, id, description, like, address, category };
  });
  return (
    <Fragment>
      <FoodModal
        setFoodsData={setFoodsData}
        handleClose={handleClose}
        open={open}
        food={selectFood}
        btnState={btnState}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">좋아요</TableCell>
              <TableCell align="center">설명</TableCell>
              <TableCell align="center">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((food) => (
              <TableRow key={food.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {food.name}
                </TableCell>
                <TableCell align="center">{food.like}</TableCell>
                <TableCell align="center">{food.description}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      selectFood = food;
                      setBtnState('UPDATE');
                      handleOpen();
                    }}>
                    정보 조회
                  </button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <IconButton
                  onClick={() => {
                    setBtnState('ADD');
                    handleOpen();
                  }}>
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default FoodTable;
