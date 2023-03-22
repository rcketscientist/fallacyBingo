import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

interface Fallacy {
  name: string;
  desc: string;
}

const FALLACIES: Fallacy[] = [
  { name: "Ad Hominem", desc: "Personal attack"},
  { name: "Ambiguity", desc: "Double meaning or unclear description"},
  { name: "Anecdotal", desc: "Isolated personal experience, not fact"},
  { name: "Appeal to Emotion", desc: "Sympathy or empathy over logic"},
  { name: "Appeal to ridicule", desc: "Dismiss an argument as not worth entertaining"},
  { name: "Bandwagon", desc: "But everybody's doing it!"},
  { name: "Begging the Question", desc: "Circular argument where the conclusion is in the premise"},
  { name: "Burden of Proof", desc: "Burden of proof lies with the claimant"},
  { name: "False Dichotomy", desc: "Present two alternatives as the only possibility when many exist"},
  { name: "Furtive Fallacy", desc: "The outcome is caused by the malfeasance of the arguer"},
  { name: "Genetic Fallacy", desc: "Believe one can accurately solely assess something based on it's origin"},
  { name: "Ignoratio Elenchi", desc: "Concludes a logical argument, but not the original argument"},
  { name: "Incomplete Comparison", desc: "Compare two unrelated things to make your point more appealing"},
  { name: "Kettle Logic", desc: "Use of several conflicting statements to defend a position"},
  { name: "Loaded Question", desc: "Question framed to force the listener into losing the debate"},
  { name: "No True Scotsman", desc: "No true <insert demographic> would do..."},
  { name: "Proof by Verbosity", desc: "An argument so complex or verbose that one can't reasonably address all the particulars"},
  { name: "Red Herring", desc: "Irrelevant pointfor the purpose of distraction"},
  { name: "Reificiation", desc: "Argument that relies on abstract concepts as if they were concrete facts"},
  { name: "Repetition", desc: "Repeat an argument exhaustively in hopes listener will fatigue"},
  { name: "Retrospective Determinism", desc: "Argue simply because something happened it was inevitable"},
  { name: "Shotgun Argument", desc: "Fire off so many arguments that a listener can't keep up"},
  { name: "Slippery Slope", desc: "If X happens then surely Y will happen"},
  { name: "Special Pleading", desc: "Ignore certain elements that are unhelpful to your claim"},
  { name: "Straw Man", desc: "Misrepresent an argument to make it easier to attack"},
  { name: "Texas Sharpshooter", desc: "Choose a cluster of data to apply to your argument"},
  { name: "Tu Quoque", desc: "Answer criticism with criticism"},
];

const shuffle = () => {
  let shuffled = FALLACIES;
  let currentIndex = FALLACIES.length;
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

  return shuffled;
}

const tiles = shuffle().slice(0,24);
tiles.splice(12, 0, { name: "Free", desc: "Probably won't even need this..."});

const App = () => {
  const [state, setState] = useState({ checked: {12: true}, won: false});

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
      if (won) {
        console.log("You won, which basically means we all lost... ;-)")
      }
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
        {tiles.map((tile, i) => (
          <div 
            onClick={() => toggle(i)} 
            className={`tile ${!!state.checked[i] ? "tile--set" : ""}`}
            key={tile.name}
            title={tile.desc}
          >
            {tile.name}
          </div>
        ))}
      </div>
      {state.won ? <div className="won">You won, which basically means <i>everyone</i> lost... ;-)</div> : null}
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
