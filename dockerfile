# Escolha a imagem base
FROM python:3.9

# Defina o diretório de trabalho
WORKDIR /app

# Instale os pacotes necessários para instalação do driver ODBC 17 para SQL Server
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    unixodbc-dev

# Adicione o repositório do Microsoft ODBC Driver para SQL Server
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

# Instale o driver ODBC 17 para SQL Server
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y \
    msodbcsql17

# Copie o arquivo de requirements.txt para o contêiner
COPY requirements.txt .

# Instale as dependências da aplicação
RUN pip install -r requirements.txt

# Copie o código da aplicação para o contêiner
COPY . .

# Defina o comando de inicialização
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
