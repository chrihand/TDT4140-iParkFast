import flask
from flask import render_template
import datetime

app = flask.Flask(__name__)
app._static_folder = "static"
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


@app.route('/')
def hello_world():
    flask.session['future'] = datetime.datetime.now() + datetime.timedelta(minutes=5)
    return render_template('main.html')


@app.route('/check')
def timer():
    now = datetime.datetime.now()
    future = flask.session['future']
    return render_template('timer.html', hasended=future>now, ends=future)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
