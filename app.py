from flask import Flask, send_from_directory, send_file
from flask_cors import CORS
from Rotas.validarUsuario import validarUsuario
from Rotas.validarToken import validarToken
from Rotas.retornarDadosVendas import retornarDadosVendas
from Rotas.retornarRegistrosVendas import retornarRegistrosVendas

import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(validarUsuario)
app.register_blueprint(validarToken)
app.register_blueprint(retornarDadosVendas)
app.register_blueprint(retornarRegistrosVendas)

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

