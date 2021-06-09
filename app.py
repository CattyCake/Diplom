from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
import cgi

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://sql4418114:8mtyhj4wCf@sql4.freesqldatabase.com:3306/sql4418114"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Room(db.Model):
    __tablename__ = 'room'

    id_room = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), primary_key=False)
    window = db.Column(db.String(256), primary_key=False)
    wall = db.Column(db.String(256), primary_key=False)
    door = db.Column(db.String(256), primary_key=False)
    sort = db.Column(db.Integer, primary_key=False)
    dev = db.relationship('Device_room', backref='room')

    def __repr__(self):
        return '<Room %>' % self.id


class Device_room(db.Model):

    __tablename__ ='device_room'

    id = db.Column(db.Integer, primary_key=True)
    id_dop_addr = db.Column(db.Integer, db.ForeignKey('dop_addr.id_dop_addr'), primary_key=False)
    id_room = db.Column(db.Integer, db.ForeignKey('room.id_room'), primary_key=False)

    def __repr__(self):
        return '<Device_room %>' % self.id


class Dop_addr(db.Model):

    __tablename__ ='dop_addr'

    id_dop_addr = db.Column(db.Integer, primary_key=True)
    id_dev = db.Column(db.Integer, db.ForeignKey('device.iddevice'), primary_key=False)
    dop_addr = db.Column(db.Integer, primary_key=False)
    idtype_device = db.Column(db.Integer, primary_key=False)
    name_device = db.Column(db.String(50), primary_key=False)
    img = db.Column(db.String(255), primary_key=False)
    dev = db.relationship('Device_room', backref='dop_addr')
    dev1 = db.relationship('Func_has_dop_addr', backref='dop_addr')

    def __repr__(self):
        return '<Dop_addr %>' % self.id


class Func_has_dop_addr(db.Model):

    __tablename__ ='func_has_dop_addr'

    func_idfunc = db.Column(db.Integer, db.ForeignKey('func.idfunc'), primary_key=False)
    dop_addr_id_dop_addr = db.Column(db.Integer, db.ForeignKey('dop_addr.id_dop_addr'), primary_key=False)
    id = db.Column(db.Integer, primary_key=True)
    default_value = db.Column(db.Integer, primary_key=False)

    def __repr__(self):
        return '<Func_has_dop_addr %>' % self.id


class Func(db.Model):

    __tablename__ ='func'

    idfunc = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), primary_key=False)
    number = db.Column(db.Integer, primary_key=False)
    write_enable = db.Column(db.Integer, primary_key=False)
    val_min = db.Column(db.Integer, primary_key=False)
    val_max = db.Column(db.Integer, primary_key=False)
    measure = db.Column(db.String(45), primary_key=False)
    shared = db.Column(db.Integer, primary_key=False)
    general_view  = db.Column(db.Integer, primary_key=False)
    show_general = db.Column(db.Integer, primary_key=False)
    dev = db.relationship('Func_has_dop_addr', backref='idfunc')

    def __repr__(self):
        return '<Func %>' % self.id

class Device(db.Model):

    __tablename__ ='device'

    iddevice = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), primary_key=False)
    address = db.Column(db.DECIMAL(3, 0), primary_key=False)
    dev = db.relationship('Dop_addr', backref='iddevice')



    def __repr__(self):
        return '<Device %>' % self.id

class Device_parametr(db.Model):

    __tablename__ ='device_parametr'

    id = db.Column(db.Integer, primary_key=True)
    iddevice = db.Column(db.Integer, primary_key=False)
    idparametrs = db.Column(db.Integer, primary_key=False)
    value = db.Column(db.Integer, primary_key=False)
    def __repr__(self):
        return '<Device_parametr %>' % self.id







@app.route('/', methods=['POST', 'GET'])

def rooms():
 if request.method == "POST":
     id = request.form['checkid']
     device_parametr = Device_parametr.query.get(id)
     device_parametr.value = request.form['checkvalue']

     try:
         db.session.commit()

         id_dop_addr = Dop_addr.query.all()
         device_room = Device_room.query.all()
         rooms = Room.query.order_by(Room.name).all()
         func_has_dop_addr = Func_has_dop_addr.query.all()
         func = Func.query.all()
         device = Device.query.all()
         device_parametr = Device_parametr.query.all()

         return render_template('rooms.html', device_parametr=device_parametr, device=device, func=func,
                                func_has_dop_addr=func_has_dop_addr, rooms=rooms, device_rooms=device_room,
                                id_dop_addr=id_dop_addr)


     except: "ошибка"

 else:

    id_dop_addr = Dop_addr.query.all()
    device_room = Device_room.query.all()
    rooms = Room.query.order_by(Room.name).all()
    func_has_dop_addr = Func_has_dop_addr.query.all()
    func = Func.query.all()
    device = Device.query.all()
    device_parametr = Device_parametr.query.all()


    return render_template('rooms.html', device_parametr=device_parametr, device=device, func=func, func_has_dop_addr=func_has_dop_addr, rooms=rooms, device_rooms=device_room, id_dop_addr=id_dop_addr)

def checkadd():

    if request.method == "POST":
         iddevice = 40
         idparameter = 1
         value = request.form['checkid']
         print("value")

         device_parametr = Device_parametr(iddevice=iddevice, idparameter=idparameter, value=value)

    try:
        db.session.add(device_parametr)
        db.session.commit()
    except:
            return "ошибка"
    else: pass






@app.route('/rooms/<int:id>')
def rooms_detail(id):
    room = Room.query.get(id)
    device_room = Device_room.query.get(id)
    return render_template('rooms_detai.html', room=room, device_rooms=device_room)


@app.route('/about', methods=['POST', 'GET'])
def about():
    if request.method == "POST":
        name = request.form['name']
        window = request.form['window']
        wall = request.form['wall']
        door = request.form['door']
        sort = 100

        room = Room(name=name, window=window, wall=wall, door=door, sort=sort)

        try:
            db.session.add(room)
            db.session.commit()
            return redirect('/')
        except:
            return "ошибка"
    else:
        return render_template('about.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1')
