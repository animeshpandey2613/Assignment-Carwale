import React, { useRef, useState, useEffect } from 'react';
import style from './BudgetArea.module.css';

function BudgetArea() {
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const barRef = useRef(null);
  const barActive = useRef(null);
  
  const [dragLeft, setDragLeft] = useState(false);
  const [dragRight, setDragRight] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      setDragLeft(false);
      setDragRight(false);
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragLeft) {
        if(e.clientX > rightButtonRef.current.offsetLeft +180){
          leftButtonRef.current.style.left = `${rightButtonRef.current.offsetLeft-20}px`
        }
        else if (e.clientX < 180) {
          leftButtonRef.current.style.left = `0px`;
        }
        else if (e.clientX > 170 + barRef.current.offsetWidth - 10) {
          leftButtonRef.current.style.left = `${barRef.current.offsetWidth - 20}px`;
        }
        else{
          leftButtonRef.current.style.left = `${e.clientX - 180}px`;
        }
        barActive.current.style.left = leftButtonRef.current.style.left;
        barActive.current.style.width = `${rightButtonRef.current.offsetLeft - leftButtonRef.current.offsetLeft}px`;
      }

      if (dragRight) {
        const barWidth = barRef.current.offsetWidth;

        if(e.clientX < leftButtonRef.current.offsetLeft +180){
          rightButtonRef.current.style.right = `${barWidth - leftButtonRef.current.offsetLeft - 40}px`
        }
        else if (e.clientX < 180) {
          rightButtonRef.current.style.right = `${barWidth-20}px`;
        }
        else if (e.clientX > 170 + barRef.current.offsetWidth) {
          rightButtonRef.current.style.right = `0px`;
        }
        else{
          rightButtonRef.current.style.right = `${barWidth - e.clientX +160}px`;
        }
        barActive.current.style.width = `${rightButtonRef.current.offsetLeft - leftButtonRef.current.offsetLeft}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dragLeft, dragRight]);

  return (
    <div className={style.container}>
      <div className={style.tagsArea}>
      <div className={style.tags}>Below ₹ 3Lakh</div>
      <div className={style.tags}>₹ 3-5 Lakh</div>
      <div className={style.tags}>₹ 5-8 Lakh</div>
      <div className={style.tags}>₹ 8-12 Lakh</div>
      <div className={style.tags}>₹ 12-20 Lakh</div>
      <div className={style.tags}>₹ 20 Lakh+</div>
      </div>
      <div className={style.barArea}>
        <div className={style.bar} ref={barRef}></div>
        <div className={style.barActive} ref={barActive}></div>
        <div
          className={style.buttonLeft}
          ref={leftButtonRef}
          onMouseDown={() => setDragLeft(true)}
        ></div>
        <div
          className={style.buttonRight}
          ref={rightButtonRef}
          onMouseDown={() => setDragRight(true)}
        ></div>
      </div>
      <div className={style.labelArea}>
        <div>Any</div>
        <div>20+</div>
      </div>
    </div>
  );
}

export default BudgetArea;
