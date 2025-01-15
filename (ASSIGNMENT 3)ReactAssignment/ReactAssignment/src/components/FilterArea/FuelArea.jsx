import React, {useState} from 'react'
import style from './FuelArea.module.css'
import style2 from './FilterArea.module.css'
import {useDispatch} from 'react-redux'
import { setFuel } from '../../redux/filters/filterActions'
function FuelArea() {
  const dispatch = useDispatch();
  const [fuelType, setFuelType] = useState([])
  const handleFuelType = (e) => {
    const {value, checked} = e.target;
    let updatedFuelType = fuelType;
    if(checked){
      updatedFuelType = [...fuelType, value];
    }
    else {
      updatedFuelType = fuelType.filter((item)=>item!==value);
    }
    console.log(updatedFuelType);
    setFuelType(updatedFuelType);
    dispatch(setFuel(updatedFuelType));
  }
  return (
    <div className={style.container}>
      <div className={style2.checkBoxArea2}>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="2" id='deisel'/> <label htmlFor="deisel">Deisel</label> <div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="1" id='petrol'/> <label htmlFor="petrol">Petrol</label><div className={style2.numberArea}>{`(500)`}</div>
        </div>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="3" id='cng'/> <label htmlFor="cng">CNG</label><div className={style2.numberArea}>{`(500)`}</div>
        </div>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="4" id='lpg'/> <label htmlFor="lpg">LPG</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="5" id='electric'/><label htmlFor="electric">Electric</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} value="6" id='hybrid'/> <label htmlFor="hybrid">Hybrid</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
      </div>
    </div>
  )
}

export default FuelArea