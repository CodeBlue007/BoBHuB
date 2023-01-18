import { Profiler } from 'react';
import FoodDetail from './FoodDetail';

const FoodDetailProfiler = () => {
  return (
    <>
      <Profiler
        id="FoodDetail"
        onRender={(id, phase, actualTime, baseTime, startTime, commitTime, interactions) =>
          console.table({ id, phase, actualTime, baseTime, startTime, commitTime, interactions })
        }>
        <FoodDetail />
      </Profiler>
    </>
  );
};

export default FoodDetailProfiler;
