import React, { useState, useEffect } from "react";

const keysToPractice = ["a", "s", "d", "f", "j", "k", "l", ";"];
const wordCombinations = [(Math.random() + 1).toString(36).substring(7)];
const paragraphToPractice = `Touch typing is typing without looking at the keyboard. The fundamental idea is that each finger is given its own section of the keyboard and your fingers learn the location of the keyboard through practicing regularly and gaining muscle memory to eventually build up speed while typing.`;

const TouchTypingApp = () => {
  const [practiceOption, setPracticeOption] = useState("single"); // 'single', 'combination', 'paragraph'
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isCorrect, setIsCorrect] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentKeyIndex, currentWordIndex]);

  const handleKeyPress = (event) => {
    const { key } = event;
    if (practiceOption === "single") {
      handleSingleKeyPress(key);
    } else if (practiceOption === "combination") {
      handleCombinationKeyPress(key);
    } else if (practiceOption === "paragraph") {
      handleParagraphKeyPress(key);
    }
  };

  const handleSingleKeyPress = (key) => {
    if (key.toLowerCase() === keysToPractice[currentKeyIndex]) {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
      if (currentKeyIndex === 0) {
        setStartTime(new Date().getTime());
      }
      setCurrentKeyIndex((prevIndex) => prevIndex + 1);
      setCurrentText((prevText) => prevText + key);
    } else {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    }
  };

  const handleCombinationKeyPress = (key) => {
    const currentWord = wordCombinations[currentWordIndex];
    if (key.toLowerCase() === currentWord[currentKeyIndex]) {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
      if (currentKeyIndex === 0) {
        setStartTime(new Date().getTime());
      }
      setCurrentKeyIndex((prevIndex) => prevIndex + 1);
      setCurrentText((prevText) => prevText + key);
    } else {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    }
  };

  const handleParagraphKeyPress = (key) => {
    if (key === paragraphToPractice[currentKeyIndex]) {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
      if (currentKeyIndex === 0) {
        setStartTime(new Date().getTime());
      }
      setCurrentKeyIndex((prevIndex) => prevIndex + 1);
      setCurrentText((prevText) => prevText + key);
    } else {
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    }
  };

  useEffect(() => {
    if (
      (practiceOption === "single" &&
        currentKeyIndex === keysToPractice.length) ||
      (practiceOption === "combination" &&
        currentKeyIndex === wordCombinations[currentWordIndex].length) ||
      (practiceOption === "paragraph" &&
        currentKeyIndex === paragraphToPractice.length)
    ) {
      setEndTime(new Date().getTime());
    }
  }, [currentKeyIndex, currentWordIndex, practiceOption]);

  const calculateTypingSpeed = () => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000; // in seconds
      const typingSpeed = Math.round((currentText.length / elapsedTime) * 60); // keys per minute
      return typingSpeed;
    }
    return null;
  };

  const handlePracticeOptionChange = (event) => {
    const option = event.target.value;
    setPracticeOption(option);
    setCurrentKeyIndex(0);
    setCurrentWordIndex(0);
    setCurrentText("");
    setIsCorrect([]);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div>
      <div style={{border:'1.3px solid black',padding:'2px 2px 2px 2px',borderRadius:"2px"}}><h1 className="topic">Touch Typing App</h1></div>
      <br/>
      <div>
        <label>
          <input
            type="radio"
            value="single"
            checked={practiceOption === "single"}
            onChange={handlePracticeOptionChange}
          />
          Single Keys
        </label>
        <label>
          <input
            type="radio"
            value="combination"
            checked={practiceOption === "combination"}
            onChange={handlePracticeOptionChange}
          />
          Word Combinations
        </label>
        <label>
          <input
            type="radio"
            value="paragraph"
            checked={practiceOption === "paragraph"}
            onChange={handlePracticeOptionChange}
          />
          Paragraph
        </label>
      </div>
      <br/>
      {practiceOption === "single" && (
        <div>
          <p>
            Type the following keys sequentially: {keysToPractice.join("")}
          </p>
          <div>
            {keysToPractice.map((key, index) => (
              <span
                key={index}
                style={{
                  padding: "0.5rem",
                  margin: "0.5rem",
                  border: currentKeyIndex === index ? "2px solid blue" : "",
                  backgroundColor: isCorrect[index]
                    ? "lightgreen"
                    : isCorrect[index] === false
                    ? "red"
                    : ""
                }}
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}
      <br/>
      {practiceOption === "combination" && (
        <div>
          <p>
            Type the following word combinations sequentially:{" "}
            {wordCombinations.join(", ")}
          </p>
          <div>
            {wordCombinations.map((word, index) => (
              <span
                key={index}
                style={{
                  padding: "0.5rem",
                  margin: "0.5rem",
                  border: currentWordIndex === index ? "2px solid blue" : "",
                  backgroundColor: isCorrect[index]
                    ? "lightgreen"
                    : isCorrect[index] === false
                    ? "red"
                    : ""
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
      {practiceOption === "paragraph" && (
        <div>
          <p>Type the following paragraph:</p>
          <p>{paragraphToPractice}</p>
        </div>
      )}
      <br />
      <div style={{ textAlign: "center", alignItems: "center",padding:"5px 5px 5px 5px" }}>
        <input
          type="text"
          value={currentText}
          readOnly
          style={{ border: "2px solid gray",padding:"10px 55px 15px 55px",fontSize:"30px" }}
        />
      </div>
      <br/>
      {endTime && (
        <div>
          <p>Typing speed: {calculateTypingSpeed()} keys per minute</p>
        </div>
      )}
    </div>
  );
};

export default TouchTypingApp;
