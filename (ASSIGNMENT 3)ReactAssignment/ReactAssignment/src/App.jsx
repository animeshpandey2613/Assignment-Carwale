import FilterArea from "./components/FilterArea/FilterArea"
import CardArea from "./components/CardArea/CardArea"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchData, fetchDataSuccess, fetchDataFailure} from './redux/data/dataActions';
import { useSelector } from "react-redux";
import urlModify from "./utils/URLModify";
import SortData from "./utils/SortData";
import './App.css'

import axios from 'axios';

function App() {
const filters = useSelector((state) => state.filterReducer);
const dispatch = useDispatch();

const URL = 'https://stg.carwale.com/api/stocks';
useEffect(() => {
  const newUrl = urlModify(URL, filters);
  dispatch(fetchData());
  axios.get(newUrl).then((e)=>{
    if(filters.sort === 'price')
      SortData(e.data.stocks);
    dispatch(fetchDataSuccess(e.data.stocks));
  }).catch((error) => {
    dispatch(fetchDataFailure(error));
  });

}, [filters]);


  return (
    <div className="Container">
      <FilterArea />
      <CardArea />
    </div>
  )
}

export default App
