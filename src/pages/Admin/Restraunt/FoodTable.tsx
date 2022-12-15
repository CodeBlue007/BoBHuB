import { Fragment, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from '@mui/material';
import { FoodType } from './Foods';
import FoodModal from './FoodModal';

let selectFood: FoodType | undefined;

interface FoodTableProps {
  foods: FoodType[];
  fetchFoodData: () => void;
}

const FoodTable = ({ foods, fetchFoodData }: FoodTableProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (food: FoodType) => {
    selectFood = food;
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const createFoodData = (
    name: string,
    distance: number,
    id: string,
    description: string,
    like: number,
    address: string,
  ) => {
    return { name, distance, id, description, like, address };
  };

  const rowData = foods.map(({ name, distance, id, description, like, address }) =>
    createFoodData(name, distance, id, description, like, address),
  );
  return (
    <Fragment>
      <FoodModal
        fetchFoodData={fetchFoodData}
        handleClose={handleClose}
        open={open}
        food={selectFood}
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
                  <button onClick={() => handleOpen(food)}>정보 조회</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default FoodTable;
