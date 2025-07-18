import React, {useState, useEffect} from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Footnote from "./components/footnote/Footnote";
import Separator from "./components/separator/Separator";
import ArticleHeader from "./components/articleHeader/ArticleHeader";

const SORT_TYPES = [
        "Oldest",
        "Newest"
    ];
function App() {
    const [articles, setArticles] = useState([])
    const [filteredSources, setFilteredSources] = useState([])
    const [allSources, setallSources] = useState([])
    const [data, setdata] = useState({
        appName : "",
        initTime : "",
        updateTime : "",
    });

    //
    const [sortState, setSortType] = useState(SORT_TYPES[0])
    
    //test
    const [testText, setTestText] = useState("Button")
    const [_mult, setMult] = useState(2)

    useEffect(
        () => {
            fetch("/data").then((res) => {
                res.json().then((data) => {
                    setdata({
                        appName: data.AppName,
                        initTime: data.DateTime,
                        updateTime: data.UpdateTime
                    })
                    let articles = JSON.parse(data.Articles);
                    setArticles(articles)
                    let articleSources = [];
                    for(let i = 0; i < articles.length; i++){
                        if(!(articleSources.includes(articles[i]["source"]["name"]))){
                            articleSources.push(articles[i]["source"]["name"]);
                        }
                    }
                    setallSources(articleSources);
                });
            });
        }, []
    );
    function sortArticles(event){
        let sortType = event;
        setSortType(sortType)
        setArticles(
            articles.sort((a, b) => {
                return sortType === "Oldest" ? Date.parse(a["publishedAt"]).valueOf() - Date.parse(b["publishedAt"]).valueOf() :
                    sortType === "Newest" ? Date.parse(b["publishedAt"]).valueOf() - Date.parse(a["publishedAt"]).valueOf() :
                    0;
            })
        );
    }
    return (
        <div className="App">
          <Navbar/>
          <div class="sidebar">
            <Separator mult={4}/>
            <h3>Sort modes</h3>
            <div class="sort-container">
                {SORT_TYPES.map((type) => {
                return (<div><button class={type !== sortState ? "sort-button" : "sort-button selected-button"} type="button" onClick={() => {sortArticles(type);}}>{type}</button><Separator mult={0.5}/></div>)
            })}
            </div>
            <h3>Available Sources</h3>
            <div class="sort-container">
                {allSources.map((sourceName) => {
                return (<div><button class={filteredSources.includes(sourceName) ? "sort-button selected-button" : "sort-button"} type="button" onClick={() => {
                    if(!filteredSources.includes(sourceName)){
                        filteredSources.push(sourceName)
                    } else {
                        let sourceIndex = filteredSources.indexOf(sourceName);
                        filteredSources.splice(sourceIndex, 1);
                    }
                    setFilteredSources([...filteredSources])
                }}>{sourceName}</button><Separator mult={0.5}/></div>)
            })}
            </div>
          </div>
          <header className="App-header">
              <Separator/>
              {/* Calling a data from setdata for showing */}
              <Separator mult={4}/>
              <h3>{data.appName}</h3>
              <Separator mult={0.2}/>
              <p>News updated as of <b>{data.updateTime}</b></p>
              <p><b>{articles.length}</b> results</p>
                <div className="article-header-container">
                {(filteredSources.length <= 0 ? articles : articles.filter(article => {return filteredSources.includes(article["source"]["name"])})).map(article => (
                   <ArticleHeader 
                        article={JSON.stringify(article)} 
                        key={article["url"]}/>
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