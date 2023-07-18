import Button from "./Button";
import Todo from "./Todo";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, counterUp] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);
  const onChange = (event) => setKeyword(event.target.value);
  const onClick = () => counterUp((current) => current + 1);
  const showHide = () => setShowing((current) => !current);

  useEffect(() => {
    console.log("I run only once.");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'keyword' & 'counter' changes.");
  }, [counter, keyword]);
  function Hello() {
    useEffect(() => {
      console.log("hi :)");
      return () => console.log("bye :("); // this return function called CLEANUP FUNCTION
    }, []);
    return <h1>Hello</h1>;
  }

  return (
    <div>
      <Todo></Todo>
      <hr></hr>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search Here..."
      ></input>
      <h1 className={styles.title}>Welcome back! {counter}</h1>
      <Button text={"continue"} onClick={onClick}></Button>
      <div>{showing ? <Hello /> : null}</div>
      <button onClick={showHide}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
