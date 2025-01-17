import React from 'react'
import style from './styles/Card.module.css'
function Card({data}) {
  return (
    <div className={style.container}>
      <div className={style.tag}>Featured</div>
        <div className={style.imageArea}>
            <img src={data.imageUrl} alt="carImage" />
        </div>
        <div className={style.contentArea}>
            <div className={style.heading}>{data.carName}</div>
            <div className={style.specsArea}>{data.km} Kms | {data.fuel} | {data.areaName}</div>
            <div className={style.priceArea}>
                 <div className={style.price}>Rs. {data.price}</div>
                 <div className={style.emiArea}>
                  {data.emiText}
                 </div>
            </div>
            <div className={style.subButtonArea}>
                <div className={style.button1}>Make offer</div>
                <div className={style.button2}>Home Test Drive</div>
            </div>
            <div className={style.buttonMain}>Get Seller Details</div>
        </div>
    </div>
  )
}

export default Card