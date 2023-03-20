import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const FALLACIES = new Map([
  ["Ad Hominem", "Personal attack"],
  ["Ambiguity", "Double meaning or unclear description"],
  ["Anecdotal", "Isolated personal experience, not fact"],
  ["Appeal to Emotion", "Sympathy or empathy over logic"],
  ["Appeal to ridicule", "Dismiss an argument as not worth entertaining"],
  ["Bandwagon", "But everybody's doing it!"],
  ["Begging the Question", "Circular argument where the conclusion is in the premise"],
  ["Burden of Proof", "Burden of proof lies with the claimant"],
  ["False Dichotomy", "Present two alternatives as the only possibility when many exist"],
  ["Furtive Fallacy", "The outcome is caused by the malfeasance of the arguer"],
  ["Genetic Fallacy", "Believe one can accurately solely assess something based on it's origin"],
  ["Ignoratio Elenchi", "Concludes a logical argument, but not the original argument"],
  ["Incomplete Comparison", "Compare two unrelated things to make your point more appealing"],
  ["Kettle Logic", "Use of several conflicting statements to defend a position"],
  ["Loaded Question", "Question framed to force the listener into losing the debate"],
  ["No True Scotsman", "No true <insert demographic> would do..."],
  ["Proof by Verbosity", "An argument so complex or verbose that one can't reasonably address all the particulars"],
  ["Red Herring", "Irrelevant pointfor the purpose of distraction"],
  ["Reificiation", "Argument that relies on abstract concepts as if they were concrete facts"],
  ["Repetition", "Repeat an argument exhaustively in hopes listener will fatigue"],
  ["Retrospective Determinism", "Argue simply because something happened it was inevitable"],
  ["Shotgun Argument", "Fire off so many arguments that a listener can't keep up"],
  ["Slippery Slope", "If X happens then surely Y will happen"],
  ["Special Pleading", "Ignore certain elements that are unhelpful to your claim"],
  ["Straw Man", "Misrepresent an argument to make it easier to attack"],
  ["Texas Sharpshooter", "Choose a cluster of data to apply to your argument"],
  ["Tu Quoque", "Answer criticism with criticism"],
]);

const shuffle = () => {
  let shuffled = Array.from(FALLACIES.entries());
  let currentIndex = FALLACIES.size;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex], shuffled[currentIndex]];
  }

  return new Map(shuffled);
}

const board = shuffle();

const Tile = ({ id, children, onToggle, isSet }) => {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
};

const App = () => {
  const [state, setState] = useState({ checked: {} });

  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };

  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <h1>Fallacy Bingo</h1>
      <div className="wrapper">
        {Object.keys(board).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {board[id]}
          </Tile>
        ))}
      </div>
      {/* {state.won ? <Confetti /> : null} */}
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);