from serial import Serial
import socketio

serial_port_name = 'COM4'
URL = "http://10.25.184.97:1555"

sio = socketio.Client()

serial_port = Serial(port=serial_port_name, baudrate=9600, timeout=2)

@sio.event
def connect():
    print('connection established')

@sio.on('send-data')
def on_message(data):
    print(data)
    if 'python' in data:
        if data['python'] == 'on':
            serial_port.write(b'5')
        elif  data['python'] == 'off':
            serial_port.write(b'6')
        # print(serial_port.readline())

@sio.event
def disconnect():
    print('disconnected from server')
    
sio.connect(URL)

while True:
    value = serial_port.readline().decode('utf-8').strip()
    
    if value:
        print('Value:', value)
        sio.emit('send-data', {'sample': int(value)})


    
  



