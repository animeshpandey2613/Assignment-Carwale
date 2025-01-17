import React from 'react'
import Card from './Card'
import style from './styles/CardArea.module.css'
import SortBar from './SortBar'
import { useSelector } from 'react-redux'
function CardArea() {
  const {cars, loading, error} = useSelector((state)=>state).dataReducer;
  return (
    <div className={style.container}>
      <SortBar />
      <div className={style.subContainer}>
        {
          cars.map((data, index)=>{
            return(
            <Card data = {data} key={index}/>
          )
          })
        }
      </div>
    </div>
  )
}

export default CardArea