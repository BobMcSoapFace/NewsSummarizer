import React, {useState, useEffect} from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Footnote from "./components/footnote/Footnote";
import Separator from "./components/separator/Separator";
import ArticleHeader from "./components/articleHeader/ArticleHeader";

function App() {
    const [articles, setArticles] = useState([])
    const [data, setdata] = useState({
        appName : "",
        initTime : "",
        articles : "",
    });
    const [testText, setTestText] = useState("Button")
    const [_mult, setMult] = useState(2)

    useEffect(
        () => {
            fetch("/data").then((res) => {
                res.json().then((data) => {
                    setdata({
                        appName: data.AppName,
                        initTime: data.DateTime,
                    })
                    setArticles(
                        JSON.parse(data.Articles)["articles"]
                    )
                });
            });
        }, []
    );

    return (
        <div className="App">
          <Navbar/>
          <div class="sidebar">
            <Separator mult={4}/>
            whazzup
          </div>
          <header className="App-header">
              <h1>React and flask</h1>
              {/* Calling a data from setdata for showing */}
              <Separator mult={4}/>
              <p>{data.appName}</p>
              <p>{data.initTime}</p>
                <div className="article-header-container">
                {articles.map(article => (
                   <ArticleHeader article={JSON.stringify(article)}/>
                ))}
                </div>
                <Separator mult={_mult}/>
                <button type="button" onClick={()=>{
                    setMult(_mult+1);
                    if(testText !== "Clicked!"){
                        setTestText("Clicked!");
                    } else {
                        setTestText("Button");
                    }
                }}>{testText}</button>
                <Separator/>
                <Footnote data={data}/>
          </header>
        </div>
    );
}

export default App;