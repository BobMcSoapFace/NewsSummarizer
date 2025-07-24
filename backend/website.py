from flask import Flask, request
import datetime
import news
import json
import newspaper
from threading import Thread, Timer
from transformers import BartTokenizer, BartForConditionalGeneration

#summarizer AI
tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
update_time = datetime.datetime.now()
summarization_cache_file = "summarizations.json"

def load_urls(articles):
    summaries = {}
    for article in articles:
        summaries[article["url"]] = get_article_summary(url=article["url"])
        print("loaded summary for " + article["url"])
        with open(summarization_cache_file, 'w') as f:
            json.dump(summaries, f)
def generate_summary(text):
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs, max_length=150, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary
def get_article_summary(url):
    try:
        with open(summarization_cache_file, 'r') as f:
            summaries = json.load(f)
        article = newspaper.Article(url=url)
        article.download()  
        article.parse()
        summary = {
            "title":article.title,
            "summary":generate_summary(article.text),
            "url":url,
            "content":article.text,
        }
        if not url in summaries:
            with open(summarization_cache_file, 'r') as f:
                summaries = json.load(f)
            summaries[url] = summary
            with open(summarization_cache_file, 'w') as f:
                json.dump(summaries, f)
        return summary
    except:
        return "GENERATE ERROR"
def find_article_summary(url):
    with open(summarization_cache_file, 'r') as f:
        summaries = json.load(f)
    if not url in summaries:
        return {
            "title":"",
            "summary":"not loaded yet. come back later",
            "url":url,
            "content":"",
        }
    else:
        return summaries[url]
#http output of data
app = Flask(__name__)

init_time = datetime.datetime.now()


@app.route('/data')
def dataPage():
    return {
       "AppName":"NewsSummarizer", 
       "DateTime": init_time,
       "Articles":json.dumps(news.get_recent_articles()),
       "UpdateTime": update_time,
    }
@app.route('/summarize', methods=["GET", "POST"])
def getSummary():
    return find_article_summary(request.get_json()["url"])

def reload():
    Timer(24*60*60, reload).start()
    print("reloading for " + str(datetime.datetime.now()))
    update_time = datetime.datetime.now()
    articles = news.get_recent_articles()
    initial_thread = Thread(target=load_urls, args = (list(articles),))
    initial_thread.start()
    
if __name__ == "__main__":
    print("website launched")
    news.write_this_date()
    reload()
    app.run(debug=True, host="localhost", port=60001, use_reloader=False)
    