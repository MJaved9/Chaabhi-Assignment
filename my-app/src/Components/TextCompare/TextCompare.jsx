import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const randomText = [
  "The Avengers, released in 2012, marked the beginning of the Marvel Cinematic Universe.",
  "Iron Man, starring Robert Downey Jr., kickstarted the MCU and is still considered one of the best entries.",
  "Captain America: The Winter Soldier, directed by the Russo brothers, is a critically acclaimed political thriller.",
  "Black Panther, directed by Ryan Coogler, broke box office records and challenged Hollywood's views on diversity.",
  "Guardians of the Galaxy, with its irreverent humor and classic soundtrack, is a fan-favorite space adventure.",
  "Spider-Man: Into the Spider-Verse, animated by Sony Pictures, won the Academy Award for Best Animated Feature.",
];
const easy = [
  "aa aa aa aa",
  "ss ss ss ss",
  "dd dd dd dd",
  "ff ff ff ff",
  "gg gg gg gg",
  "hh hh hh hh",
  "jj jj jj jj",
  "kk kk kk kk",
  "ll ll ll ll",
  "ls dj al dl",
  "as as as as",
  "df df df df",
  "gh gh gh gh",
  "jk jk jk jk",
  "l; l; l; l;",
  "sa df gj lk",
  "dj al sk ;l",
  "as df gj kl",
  "sd jg la ;k",
  "asdf l;l;",
  "djsa fghl",
  "sadj hgfl",
  "jdas l;gh",
  "asdj ;lgf",
  "sdja hl;g",
  "djsa lg;h",
  "adsj ;flg",
  "sjad glh;",
  "jads ;lhg",
];
const TextCompare = () => {
  const currentText = useSelector((store) => store.AppReducer.currentText);

  const [inputText, setInputText] = useState("");
  const [currentLetter, setCurrentLetter] = useState(currentText[0]);
  const [startTime, setStartTime] = useState(null);
  const [total, setTotal] = useState(1);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctCount, setCorrectCount] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const [totalCharacterTyped, setTotalCharacterTyped] = useState(0);
  const [wrongCharacterTyped, setWrongCharacterTyped] = useState(0);
  const [level, setLevel] = useState("easy");

  const dispatch = useDispatch();

 

  if (seconds % 300 == 0 && seconds !== 0 && timerId) {
    clearInterval(timerId);
    setSeconds(0);
    console.log("ll");
    const elapsedTime = (Date.now() - startTime) / 1000;
    const WPM = Math.round(totalCharacterTyped / 5 / (elapsedTime / 60));
    const NWPM = Math.round(
      (totalCharacterTyped - wrongCharacterTyped) / 5 / (elapsedTime / 60)
    );
    const accuracy = Math.floor((NWPM * 100) / WPM);
    dispatch({ type: "5MIN", payload: { totalCharacterTyped, WPM } });
    
  }

  function startTimer(){
    setTotalCharacterTyped(0)
    setWrongCharacterTyped(0)
    let id = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setTimerId(id);
   
  }

  const handleTextChange = () => {
    if (level == "easy") {
      const randomIndex = Math.floor(Math.random() * easy.length);

      setCurrentLetter(easy[randomIndex][0]);

      dispatch({ type: "CHANGE", payload: easy[randomIndex] });
    } else {
      const randomIndex = Math.floor(Math.random() * randomText.length);

      setCurrentLetter(randomText[randomIndex][0]);

      dispatch({ type: "CHANGE", payload: randomText[randomIndex] });
    }
  };
  // const [count]

  const color = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputText(value);

    if (seconds == 0 && !timerId) {
      let id = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      setTimerId(id);
    }
    

    // Checking the Text is Correct or not
    let check = "";
    for (let i = 0; i < value.length; i++) {
      check = check + currentText[i];
      if (
        value[i] === currentText[i] &&
        correctCount[i] == undefined &&
        color.current.style.color !== "red"
      ) {
        correctCount[i] = true;
        setCorrectCount({ ...correctCount });
      } else if (
        correctCount[i] == undefined &&
        color.current.style.color !== "red"
      ) {
        correctCount[i] = false;
        setCorrectCount({ ...correctCount });
      }
    }

    // Count total charactered typed
    if (value.length > inputText.length) {
      setTotal((pre) => pre + 1);
      setTotalCharacterTyped(totalCharacterTyped + 1);
    }

    // Timer for WPM
    if (!startTime) {
      setStartTime(Date.now());
    }

    // TEXT color change is Wrong
    if (check !== value) {
      color.current.style.color = "red";
      setWrongCount(wrongCount + 1);
      setWrongCharacterTyped(wrongCharacterTyped + 1);
    } else {
      color.current.style.color = "black";

      if (value[value.length - 1] === currentText[value.length - 1]) {
        setCurrentLetter(currentText[value.length]);
      }
    }

    // When One Round is done
    if (check === value && value.length === currentText.length) {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const WPM = Math.round(total / 5 / (elapsedTime / 60));
      const NWPM = Math.round((total - wrongCount) / 5 / (elapsedTime / 60));

      const accuracy = Math.floor((NWPM * 100) / WPM);


      setInputText("");
      setStartTime(null);
      setTotal(1);
      setCorrectCount({});
      setWrongCount(0);
      dispatch({ type: "SHOW", payload: { wpm: WPM, accuracy: accuracy } });
      handleTextChange();
    }
  };

  useEffect(() => {
    handleTextChange();
  }, [level]);

  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box>
          <RadioGroup onChange={setLevel} value={level}>
            <Stack direction="row">
              <Radio value="easy">Easy</Radio>
              <Radio value="hard">Hard</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Text fontSize={"20px"} fontWeight="bold">
            Press:-
          </Text>
          <Button
            color={"black"}
            fontSize="20px"
            fontWeight={"bold"}
            borderRadius="2"
            // border={"4px solid turquoise"}
            bg={"turquoise"}
            padding="0 30px 0 30px"
            margin={"20px"}
          >
            {currentLetter === " " ? "Space" : currentLetter}
          </Button>
        </Box>
        <Box>
          Minutes: {minutes} Seconds: {formattedSeconds}
         {
          seconds==0 &&
          <Button
            color={"black"}
            fontSize="20px"
            fontWeight={"bold"}
            borderRadius="2"
            bg={"turquoise"}
            padding="0 30px 0 30px"
            margin={"20px"}
            onClick={startTimer}
          >
            Start
          </Button>}
        </Box>
      </Box>
      <Textarea
        padding={"2px"}
        rows={4}
        cols={50}
        value={inputText}
        onChange={handleInputChange}
        ref={color}
        fontSize="30px"
        fontWeight={"bold"}
        bg={"white"}
        color="black"
        placeholder="Start typing..."
        _placeholder={{ fontSize: "20px", color: "black" }}
        border="turquoise"
        _hover={{ border: "4px solid turquoise" }}
        borderRadius="0"
      />
    </div>
  );
};

export default TextCompare;
