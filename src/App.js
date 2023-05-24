import "./styles.css";
import { useEffect, useState } from "react";

function Timer(props) {
  const { correctWords, startCounting } = props;
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (startCounting) {
      intervalId = setInterval(() => {
        setTime((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [startCounting]);

  const minutes = time / 60;
  return (
    <div>
      <p>
        <b>Time </b> : {time}
      </p>
      <p>
        <b>speed</b> : {(correctWords / minutes || 0).toFixed(2)} WPM
      </p>
    </div>
  );
}

function App() {
  const [userInput, setUserInput] = useState([]);
  const [activeWord, setActiveWord] = useState(0);
  const [compareValue, setCompareValue] = useState("");
  const [correctWords, setCorrectWords] = useState([]);
  const [startCounting, setStartCounting] = useState(false);

  const data =
    "asdfjkl; ;lkjfdsa fdsajkl; asdfjkl; asdfjkl; asdfjkl; asdfjkl; asdfjk;l asdf jk;lasdfjkl; fdldska;fjfkdls;alskdfj aaassssddddffffjjjkklll;;;;lkj jkl;as";

  const splitData = data.split(" ");

  const handleInput = (value) => {
    if (!startCounting) {
      setStartCounting(true);
    }
    setCompareValue(value);
    if (value.endsWith(" ")) {
      if (activeWord === splitData.length) {
        setStartCounting(false);
        setUserInput("Completed");
        return;
      }
      setActiveWord(activeWord + 1);
      setUserInput("");
      setCorrectWords((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWord] = word === splitData[activeWord];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  };

  const CurrentWord = (props) => {
    const { word, active, correct } = props;
    if (correct === true) {
      return <span className="activeGreen">{word} </span>;
    }
    if (correct === false) {
      return <span className="activeRed">{word} </span>;
    }
    if (active) {
      return <span className="active">{word} </span>;
    }
    return <span>{word} </span>;
  };

  return (
    <div className="App">
      <h1>Typing test</h1>
      <div className="container">
        <Timer
          startCounting={startCounting}
          correctWords={correctWords.filter(Boolean).length}
        />

        <p>
          {splitData.map((currentWord, index) => {
            return (
              <CurrentWord
                word={currentWord}
                active={index === activeWord}
                correct={correctWords[index]}
              />
            );
          })}
        </p>
        <input
          type="text"
          placeholder="start practising... "
          className="inputClass"
          value={userInput}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
