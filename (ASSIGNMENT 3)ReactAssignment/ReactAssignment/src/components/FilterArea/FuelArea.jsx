import React, {useEffect, useState} from 'react'
import style from './styles/FuelArea.module.css'
import style2 from './styles/FilterArea.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { setFuel } from '../../redux/filters/filterActions'

function FuelArea() {
  const dispatch = useDispatch();
  const initialStatus = [false,false,false,false,false,false]
  const [fuelStatus, setFuelStatus] = useState(initialStatus);
  const stateFuel = useSelector((state)=>state.filterReducer.fuel);
  const handleFuelType = (e) => {
    const {value, checked} = e.target;
    const newFuelStatus = fuelStatus;
    newFuelStatus[value-1] = checked;
    setFuelStatus(newFuelStatus);
    let indexes = [];
    for (let i = 0; i < newFuelStatus.length; i++) {
      if (newFuelStatus[i]) {
        indexes.push(i+1);
      }
    }
    dispatch(setFuel(indexes));
  }

  useEffect(()=>{
    console.log(stateFuel);
    const newFuelStatus = initialStatus;
    stateFuel.forEach(element => {
      newFuelStatus[element-1] = true;
    });
    setFuelStatus(newFuelStatus);
  }, [stateFuel]);

  return (
    <div className={style.container}>
      <div className={style2.checkBoxArea2}>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[0]} value="1" id='petrol'/> <label htmlFor="petrol">Petrol</label><div className={style2.numberArea}>{`(500)`}</div>
        </div>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[1]}  value="2" id='deisel'/> <label htmlFor="deisel">Deisel</label> <div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[2]} value="3" id='cng'/> <label htmlFor="cng">CNG</label><div className={style2.numberArea}>{`(500)`}</div>
        </div>
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[3]} value="4" id='lpg'/> <label htmlFor="lpg">LPG</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[4]} value="5" id='electric'/><label htmlFor="electric">Electric</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
        <div className={style2.checkBoxPair}>
          <input type="checkbox" onChange={handleFuelType} checked={fuelStatus[5]} value="6" id='hybrid'/> <label htmlFor="hybrid">Hybrid</label><div className={style2.numberArea}>{`(500)`}</div>
        </div> 
      </div>
    </div>
  )
}

export default FuelArea