import newsapi

API_KEY = "d84665741d3d4d80a69ede4ba7fb5fa2"

client = newsapi.NewsApiClient(api_key=API_KEY)

languages = "ardeenesfrheitnlnoptrusvudzh"
countries = "aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza"
categories = ["business","entertainment","general","health","science","sports","technology"]

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

# sources = client.get_sources(
#     country='us',
#     language='en'
# )
# print(sources)
