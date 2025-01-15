import React from 'react'
import style from './SortBar.module.css'
import {useDispatch} from 'react-redux'
import {setSort} from '../../redux/filters/filterActions'
import {removeSort} from '../../redux/filters/filterActions'
function SortBar() {
  const dispatch = useDispatch()
  const handleChange=(e)=>{
    const sortBy = e.target.value;
    if(sortBy === "")
      dispatch(removeSort());
    else{
      dispatch(setSort(sortBy))
    }
  }
  return (
    <div className={style.container}>
      <div className={style.sortArea}>
        <div>Sort By:</div>
        <div>
          <select name="sort" id="sort" onChange={handleChange} className={style.sortSelect}>
          <option value="">Default</option>
          <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SortBar