import React, { useState } from 'react'
import Result from '../Components/Result/Result'
import Timer from '../Components/Timer/Timer'
import TypingBox from '../Components/TypingBox/TypingBox'
import style from "./Home.module.css"

function Home() {


  return (
    <div className={style.home}>
        {/* <Timer/> */}
        <TypingBox/>
        <Result/>
    </div>
  )
}

export default Home