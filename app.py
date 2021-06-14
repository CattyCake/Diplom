from flask import Flask, render_template, url_for, request, redirect, jsonify
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

    id_d_r = db.Column(db.Integer, primary_key=True)
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
    write_enable = db.Column(db.BINARY(1), primary_key=False)
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

class Function1(db.Model):

    __tablename__ ='function1'

    idfunction = db.Column(db.Integer, primary_key=True)
    idfunc = db.Column(db.Integer, primary_key=False)
    data = db.Column(db.DECIMAL(6, 1), primary_key=False)
    time = db.Column(db.DATETIME, primary_key=False)
    id_dop_addr = db.Column(db.Integer, primary_key=False)
    comment = db.Column(db.String(45), primary_key=False)

    def __repr__(self):
        return '<Function1 %>' % self.id

class Type_device(db.Model):

    __tablename__ ='type_device'

    idtype_device = db.Column(db.Integer, primary_key=True)
    name_type_device = db.Column(db.String(50), primary_key=False)
    idgroup = db.Column(db.Integer, primary_key=False)
    code = db.Column(db.String(255), primary_key=False)


    def __repr__(self):
        return '<Type_device %>' % self.id



class Device_Card():
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), primary_key=False)
    value = db.Column(db.DECIMAL(6, 1), primary_key=False)
    idfunc = db.Column(db.Integer, primary_key=False)
    code = db.Column(db.String(45), primary_key=False)
    idgroup = db.Column(db.Integer, primary_key=False)
    val_max = db.Column(db.Integer, primary_key=False)
    val_min = db.Column(db.Integer, primary_key=False)
    write_enable = db.Column(db.Integer, primary_key=False)
    idtype_device = db.Column(db.Integer, primary_key=False)
    measure = db.Column(db.Integer, primary_key=False)
    img = db.Column(db.String(45), primary_key=False)

    def __repr__(self):
        return '<Device_Card %>' % self.id



@app.route('/', methods=['POST', 'GET'])
def rooms():

    rooms = Room.query.all()
    device_room = Device_room.query.all()
    dop_addr = Dop_addr.query.all()
    function1 = Function1.query.all()
    func = Func.query.all()
    type_device = Type_device.query.all()

    return render_template('rooms.html', type_device=type_device, func=func, rooms=rooms, device_room=device_room, function1= function1, dop_addr=dop_addr)



@app.route('/ajax', methods = ['POST'])
def ajax_request():

    if request.method == 'POST':
        rooms = Room.query.all()
        device_room = Device_room.query.all()
        dop_addr = Dop_addr.query.all()
        function1 = Function1.query.all()
        func = Func.query.all()
        type_device = Type_device.query.all()



    return  jsonify({'htmlresponse': render_template('response.html', type_device=type_device, func=func, rooms=rooms, device_room=device_room,
                                         function1=function1, dop_addr=dop_addr)})

@app.route('/roominfo', methods = ['POST'])
def ajax_info():

    if request.method == 'POST':
        id = request.form['id']
        rooms = Room.query.all()
        device_room = Device_room.query.all()
        dop_addr = Dop_addr.query.all()
        function1 = Function1.query.all()
        y=int(id)
        x=bytes(b'\x01')


        func = Func.query.all()

    return jsonify({'htmlresponse1': render_template('roominfo.html', y=y, x=x,  id=id,  func=func, rooms=rooms, device_room=device_room,
                                                     function1= function1, dop_addr=dop_addr)})

@app.route('/button', methods=['POST'])
def ajax_button():
    return jsonify({'htmlresponse2': render_template('ButtonUpdate.html')})

@app.route('/buttonback', methods=['POST'])
def ajax_buttonback():
    return jsonify({'htmlresponse3': render_template('ButtonBack.html')})



if __name__ == '__main__':
    app.run(host='127.0.0.1')
