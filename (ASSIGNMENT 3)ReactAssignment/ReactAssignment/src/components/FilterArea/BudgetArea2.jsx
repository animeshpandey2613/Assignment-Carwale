import React , {useEffect, useState} from 'react'
import style from './styles/BudgetArea2.module.css'
import { setBudget } from '../../redux/filters/filterActions';
import { useDispatch, useSelector} from 'react-redux';
function PriceRange() {
  
    const [range, setRange] = useState({ min: 0, max: 20 });
    const maxPossibleValue = 20;
    const dispatch = useDispatch();
    const budgetChange = useSelector((state)=>state.filterReducer.budget);
    useEffect(()=>{
      setRange(budgetChange);
    }, [budgetChange]);
    const handleMinChange = (e) => {
      const newMin = Math.min(Number(e.target.value), range.max);
      setRange(prev => ({ ...prev, min: newMin }));
      dispatch(setBudget(newMin, range.max))
    };
  
    const handleMaxChange = (e) => {
      const newMax = Math.max(Number(e.target.value), range.min);
      setRange(prev => ({ ...prev, max: newMax }));
      dispatch(setBudget(range.max , newMax));
    };
  
    return (
      <>
        <div className={style.sliderContainer}>
         
        
  
          <div className={style.sliderTrackContainer}>
            <div className={style.sliderTrack}></div>
            <div
              className={style.sliderRange}
              style={{
                left: `${(range.min / maxPossibleValue) * 100}%`,
                right: `${100 - (range.max / maxPossibleValue) * 100}%`
              }}
            ></div>
  
            <div className={style.rangeInputs}>
              <input
                type="range"
                min={0}
                max={maxPossibleValue}
                value={range.min}
                onChange={handleMinChange}
                className={style.rangeInput}
              />
              <input
                type="range"
                min={0}
                max={maxPossibleValue}
                value={range.max}
                onChange={handleMaxChange}
                className={style.rangeInput}
              />
            </div>
          </div>




          <div className={style.rangeLabels}>
            <span>Any</span>
            <span>{maxPossibleValue}+ Lakh</span>
          </div>
  
          <div className={style.inputFields}>
            <input
              type="number"
              value={range.min}
              onChange={handleMinChange}
              min={0}
              max={range.max}
              className={style.numberInput}
            />
            <span className={style.separator}>-</span>
            <input
              type="number"
              value={range.max}
              onChange={handleMaxChange}
              min={range.min}
              max={maxPossibleValue}
              className={style.numberInput}
            />
          </div>
        </div>
      </>
    )
}

export default PriceRange