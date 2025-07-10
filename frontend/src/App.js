import React, {useState, useEffect} from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Footnote from "./components/footnote/Footnote";
import Separator from "./components/separator/Separator";

function App() {
    const [data, setdata] = useState({
        appName : "",
        initTime : ""
    });
    const [testText, setTestText] = useState("Button")
    const [_mult, setMult] = useState(2)

    useEffect(
        () => {
            fetch("/data").then((res) => {
                res.json().then((data) => {
                    setdata({
                        appName: data.AppName,
                        initTime: data.DateTime
                    })
                });
            });
        }, []
    );

    return (
        <div className="App">
          <Navbar/>
          <header className="App-header">
              <h1>React and flask</h1>
              {/* Calling a data from setdata for showing */}
              <p>{data.appName}</p>
              <p>{data.initTime}</p>
              <Separator mult={_mult}/>
              <button type="button" onClick={()=>{
                setMult(_mult+1);
                if(testText !== "Clicked!"){
                    setTestText("Clicked!");
                } else {
                    setTestText("Button");
                }
              }}>{testText}</button>
          </header>
          <Footnote data={data}/>
        </div>
    );
}

export default App;