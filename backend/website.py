from flask import Flask
import datetime

app = Flask(__name__)

init_time = datetime.datetime.now()

@app.route('/data')
def test():
    return {
       "AppName":"NewsSummarizer", 
       "DateTime":init_time,
    }

if __name__ == "__main__":
    app.run(debug=True, port=8001)