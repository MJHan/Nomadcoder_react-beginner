import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, counterUp] = useState(0);
  const onClick = () => counterUp((current) => current + 1);
  console.log("I run all the time");
  const iRunOnlyOnce = () => {
    console.log("I run only once");
  };
  useEffect(iRunOnlyOnce, []);
  return (
    <div>
      <h1 className={styles.title}>Welcome back! {counter}</h1>
      <Button text={"continue"} onClick={onClick}></Button>
    </div>
  );
}

export default App;
