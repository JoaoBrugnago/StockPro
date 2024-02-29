from flask import Flask, send_from_directory
from flask_cors import CORS
from Rotas.validarUsuario import validarUsuario
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(validarUsuario)

# Rota para servir os arquivos estáticos do React
@app.route('/')
def index():
    return send_from_directory(os.path.join(os.getcwd(), 'build'), 'index.html')

# Rota para servir os outros arquivos estáticos do React
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(os.path.join(os.getcwd(), 'build'), path)

if __name__ == '__main__':
    app.run(debug=True)
