from flask import Flask
from flask import redirect, url_for
from flask import render_template
import sqlite3 as sql
from flask import request
import os

app = Flask(__name__)
app._static_folder = "static"

DATABASE = os.path.dirname(os.path.abspath(__file__)) + '/users.db' # In same folder as TDT4140-iParkFast.py

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/timer')
def timer():
    return render_template('timer.html')

@app.route('/login', methods=['POST'])
def login():
    # Logger inn brukeren
    username = (request.form['username'])
    password = (request.form['password'])
    user = (username,)
    #password = (userpassword,)
    print('log in user %s' % username)
    with sql.connect(DATABASE) as con:
        try:
            print('hei')
            con.row_factory = sql.Row
            cur = con.cursor()
            cur.execute('SELECT * FROM User WHERE username=?', user)
            checkusername = cur.fetchone()
            print(checkusername)
            if checkusername:
                cur.execute('SELECT userpassword FROM user WHERE username=?', user)
                checkpassword = cur.fetchone()
                print(checkpassword)
                print("PAss: " + password)
                if checkpassword == password:
                    return redirect(url_for('timer'))
                else:
                    return render_template('index.html', wrong='Wrong username or password')
            else:
                return render_template('index.html', wrong='Wrong username or password')
        except Exception as e:
            print(str(e))
    return render_template('index.html', wrong='Wrong username or password')


@app.route('/register', methods=['POST'])
def register():
    # registrer bruker, redirect til onsket sted
    print('register user %s' % request.form['newUsername'])
    with sql.connect(DATABASE) as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        cur.execute("INSERT INTO User (userID, userName, userPassword) VALUES (?,?,?)",
                    (None, request.form['newUsername'], request.form['newPassword']))
        return redirect(url_for('timer'))
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=7000)