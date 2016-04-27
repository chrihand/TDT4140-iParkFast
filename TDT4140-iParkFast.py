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
    return render_template('login.html')


@app.route('/parked')
def parked():
    return render_template('parked.html')


# A user can log in if it has a username and password in the database.
# If username and password is correct the user is sent to the timer site.
@app.route('/login', methods=['POST'])
@app.route('/login/<username>')
def login():
    # Logger inn brukeren
    username = (request.form['username'])
    password = (request.form['password'])
    user = (username,)
    print('log in user %s' % username)
    with sql.connect(DATABASE) as con:
        try:
            con.row_factory = sql.Row
            cur = con.cursor()
            cur.execute('SELECT * FROM User WHERE username=?', user)
            checkusername = cur.fetchone()
            if checkusername:
                cur.execute('SELECT userpassword FROM user WHERE username=?', user)
                checkpassword = cur.fetchone()
                if checkpassword[0] == password:
                    print("User: " , username)
                    #return redirect(url_for('timer', loginUsername=''))
                    return render_template('timer.html', loginUsername=username)
                else:
                    return render_template('login.html', wrong='Wrong username or password')
            else:
                return render_template('login.html', wrong='Wrong username or password')
        except Exception as e:
            print(str(e))
            return render_template('login.html', wrong='Wrong username or password')


# A user can register a new account if the username is not in the database.
# The user is sent to the timer site when a unused username is entered together with a password.
@app.route('/register', methods=['POST'])
def register():
    # registrer bruker, redirect til onsket sted
    print('register user %s' % request.form['newUsername'])
    username = (request.form['newUsername'])
    taken = (username,)
    with sql.connect(DATABASE) as con:
        try:
            con.row_factory = sql.Row
            cur = con.cursor()
            cur.execute ('SELECT username FROM User WHERE username=?', taken)
            checkusername = cur.fetchone()
            if checkusername:
                return render_template('login.html', taken='Username is taken')
            else:
                cur.execute("INSERT INTO User (userID, userName, userPassword) VALUES (?,?,?)",
                    (None, request.form['newUsername'], request.form['newPassword']))
                return render_template('timer.html', loginUsername=username)
        except Exception as e:
            print(str(e))
            return render_template('login.html', taken='Username is taken')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=7000)