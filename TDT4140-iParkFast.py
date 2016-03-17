from flask import Flask
from flask import render_template

app = Flask(__name__)
app._static_folder = "static"



@app.route('/')
def timer():
    return render_template('timer.html')

@app.route('/index')
def login():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=7000)