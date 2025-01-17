import React, {useState, useRef, useEffect} from 'react'
import style from './styles/FilterArea.module.css'
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import FuelArea from './FuelArea';
import BudgetArea from './BudgetArea2';
import { useDispatch } from 'react-redux';
import { removeAllFilters } from '../../redux/filters/filterActions';
function FilterArea() {
  const [fuelDisplay, setFuelDisplay] = useState(false);
  const [budgetDisplay, setBudgetDisplay] = useState(false);
const FuelRef = useRef(null);
const BudgetRef = useRef(null);
const dispatch = useDispatch();

const ClearHandler = ()=>{
  dispatch(removeAllFilters());
}

useEffect(() => {
  if(fuelDisplay){
    FuelRef.current.style.display = 'block';
  }
  else{
    FuelRef.current.style.display = 'none';
  } 
}
,[fuelDisplay])

useEffect(() => {
  if(budgetDisplay){
    BudgetRef.current.style.display = 'block';
  }
  else{
    BudgetRef.current.style.display = 'none';
  }
}
,[budgetDisplay])
  return (
    <div className={style.container}>
      <div className={style.headingContainer}>
        <div className={style.heading}> <CiFilter /> Filters</div>
        <div className={style.clearTag} onClick={ClearHandler}>Clear All</div>
      </div>
      {/* <div className={style.checkBoxArea}>
          

      <div className={style.checkBoxPair}>
                    <input type="checkbox" id="carWaleAbSure" name="carWaleAbSure" value="carWaleAbSure" /> <label for="carWaleAbSure">CarWale abSure</label> <div className={style.numberArea}>{`(500)`}</div>
                </div> 
              <div className={style.checkBoxPair}>
                    <input type="checkbox" id="certifiedCars" name="certifiedCars" value="certifiedCars" /> <label for="certifiedCars">Certified Cars</label><div className={style.numberArea}>{`(500)`}</div>
                </div> 
              <div className={style.checkBoxPair}>
                    <input type="checkbox" id="qualityReportAvailable" name="qualityReportAvailable" value="qualityReportAvailable" /> <label for="qualityReportAvailable">Quality Report Available</label><div className={style.numberArea}>{`(500)`}</div>
                </div> 
              <div className={style.checkBoxPair}>
                <input type="checkbox" id="luxuryCars" name="luxuryCars" value="luxuryCars" /> <label for="luxuryCars">Luxury Cars</label><div className={style.numberArea}>{`(500)`}</div>
                </div> 
      </div> */}
      <div className={style.filterArea}>
        <div className={style.pair}>
          <div className={style.label} onClick={()=>setFuelDisplay((e)=>!e)}> Fuel { fuelDisplay? (<IoIosArrowUp />):(<IoIosArrowDown />) } </div>
          <div ref={FuelRef}>
            <FuelArea/>
            </div>
        </div>
        <div className={style.pair}>
          <div className={style.label} onClick={()=>setBudgetDisplay((e)=>!e)}>Budget { budgetDisplay? (<IoIosArrowUp />):(<IoIosArrowDown />) } </div>
          <div ref={BudgetRef}>

          <BudgetArea/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FilterArea