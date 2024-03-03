'''
from flask import Flask, send_from_directory
from flask_cors import CORS
from Rotas.validarUsuario import validarUsuario
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(validarUsuario)

# Rota para servir o arquivo HTML principal do React
@app.route('/')
def index():
    return send_from_directory(os.path.join(os.getcwd(), 'Front', 'dist'), 'index.html')

# Rota para servir o arquivo JavaScript principal do React
@app.route('/index.js')
def serve_index_js():
    return send_from_directory(os.path.join(os.getcwd(), 'Front', 'dist', 'assets'), 'index-DWyWWYd6.js')

# Rota para servir os outros arquivos estáticos do React
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(os.path.join(os.getcwd(), 'Front', 'dist'), path)

if __name__ == '__main__':
    app.run(debug=True)
'''

from flask import Flask, send_from_directory, send_file
from flask_cors import CORS
from Rotas.validarUsuario import validarUsuario
from Rotas.validarToken import validarToken
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(validarUsuario)
app.register_blueprint(validarToken)

# Rota para servir o arquivo HTML principal do React
@app.route('/')
def index():
    return send_from_directory(os.path.join(os.getcwd(), 'Front', 'dist'), 'index.html')

# Rota para servir os outros arquivos estáticos do React
@app.route('/<path:filename>')
def serve_static(filename):
    root_dir = os.path.join(os.getcwd(), 'Front', 'dist')
    if os.path.exists(os.path.join(root_dir, filename)):
        return send_file(os.path.join(root_dir, filename))
    else:
        return send_from_directory(os.path.join(root_dir), 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

