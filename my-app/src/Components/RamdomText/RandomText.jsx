import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./RandomText.module.css";



const RandomText = () => {
    const {currentText} = useSelector(store=>store.AppReducer);
    const disptach=useDispatch();
    // console.log(randomText)
 

  return (
    <div className={style.textBox}>
      <div>{currentText}
      
      </div>
      {/* <Button marginTop={"30px"} borderRadius="0" bg={"turquoise"} onClick={handleClick} color="black">
        Show Random Text
      </Button> */}
    </div>
  );
};

export default RandomText;
