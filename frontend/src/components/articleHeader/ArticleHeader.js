import React, { useState } from 'react';
import "./ArticleHeader.css";
import axios from 'axios';

async function get(params) {
    axios.post("/summarize")
}
export default function ArticleHeader({article}){
    let jsonArticle = JSON.parse(article);
     const [summary, setSummary] = useState("loading...");
     const [show, setShow] = useState(false);
     const handleShow = () => setShow(!show)
    return(
        <div class="article-header">
            <span class="article-title" onClick={()=>{
                handleShow();
                console.log("getting summary for " + jsonArticle["url"]);
                axios.post("/summarize", { url: jsonArticle["url"] }).then((res)=>{setSummary(res.data["summary"])});
            }}>{jsonArticle["title"]}</span><br/>
            <span class="article-info">{jsonArticle["source"]["name"]}</span>
            <span class="article-info">Published - {jsonArticle["publishedAt"]}</span>
            <a class="article-info" href={jsonArticle["url"]}>{jsonArticle["url"]}</a>
            <div class={show ? "summary-container" : "summary-container hidden"}>
                {summary}
            </div>
        </div>
    );
}