import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Result() {
  const { wpm, accuracy, totalPressIn5, wpmIn5 } = useSelector(
    (store) => store.AppReducer
  );
  return (
    <div>
      <Heading
        fontSize={"30px"}
        marginBottom="10px"
        color="black"
        textAlign={"left"}
      >
        Result
      </Heading>

      
      <Text fontSize={"16px"} display="flex" alignItems="center" gap="10px">
        <b>WPM:-</b>
        {wpm}
      </Text>
      <Text fontSize={"16px"} display="flex" alignItems="center" gap="10px">
         <b>Accuracy:-</b>
        {`${accuracy}%`}
      </Text>


      <Heading
        fontSize={"18px"}
        marginBottom="10px"
        color="turquoise"
        textAlign={"left"}
        marginTop="80px"
      >
        {/* Result for 5 Min */}
      </Heading>

      
      {/* <Text fontSize={"16px"} display="flex" alignItems="center" gap="10px">
        <b>WPM:-</b>
        {wpmIn5}
      </Text> */}
      <Text fontSize={"16px"} display="flex" alignItems="center" gap="10px">
        <b>Total key Pressed in 5 MIn:-</b>
        {totalPressIn5}
      </Text>
      
    </div>
  );
}

export default Result;
