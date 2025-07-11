import newsapi
import datetime
import json
from api_key import API_KEY
from website import load_urls
from threading import Thread

current_articles_file_name = "current_articles.json"
client = newsapi.NewsApiClient(api_key=API_KEY)
print("Running News API client")
summarization_cache_file = "summarizations.json"

languages = "ardeenesfrheitnlnoptrusvudzh"
countries = "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
categories = ["business","entertainment","general","health","science","sports","technology"]

def get_articles():
    return client.get_everything(
                sources= ",".join([x["id"] for x in sources["sources"]]),
                from_param= datetime.date.today() - datetime.timedelta(days=2),
                sort_by="popularity",
            )
def two_code_string_to_array(string):
    if(len(string)%2!=0 or len(string) < 2):
        raise ValueError("String meant to be split into two-coded array is uneven! (len:" + str(len(string)) + ")")
    list = []
    for i in range(2, len(string)-1, 2):
        list.append(string[i:i+2])
    return list

selected_language = "en"
selected_country = "us"
countries = two_code_string_to_array(countries)
languages = two_code_string_to_array(languages)

def select_two_code(type):
    x = ""
    valid = False
    while(len(x) != 2 or not valid):
        print(languages if type == "languages" else countries)
        x = input("Select " + type + " : ")
        valid = x.lower() in (languages if type == "languages" else countries)
        if(len(x) != 2 or not valid):
            print("Invalid input!")
    return x

sources = client.get_sources(
    country='us',
    language='en'
)
current_articles = get_articles()
with open('current_articles.json', 'w') as f:
    json.dump(current_articles, f)

def get_recent_articles(last_day=datetime.datetime.now() - datetime.timedelta(days=5)):
    if(last_day[0].day != datetime.datetime.now().day):
        last_day[0] = datetime.datetime.now()
        articles = get_articles()
        with open(current_articles_file_name, 'w') as f:
            json.dump(articles, f)
        thread = Thread(target=load_urls, args = (list(articles["articles"]),))
        thread.start()
    with open(current_articles_file_name, 'r') as f:
        data = json.load(f)
    return data


