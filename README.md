# FMDEV

Framework for Educational Data Mining Developed By Universidade de Pernambuco.

## Requirements:

* Python `3.7.6`.
* Yarn `1.22.0`.
* npm `6.13.7`.
* nodejs `13.9.0`.
* Git `2.17.1` or superior.
* For production deploy, we strongly install on `Ubuntu 18.04`.

## Minimal Hardware

* 4 GB
* 2 CPUs
* 80 GB/ SSD DISK

# 1. Installation

## Download Repository

```sh
cd ~/

git clone https://github.com/prof-alexandre-maciel/fmdev.git
```

### 1.1 Yarn

```sh 
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn
```

### 1.2 Node Version Manager

This tool, helps to install Node.js and NPM (Node Package Manager).

```sh
sudo apt update

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh

source ~/.nvm/nvm.sh

nvm install 13.9.0

nvm use 13.9.0
```

Check installation:

```sh
node --version

npm --version
```

## 1.3 React.js

Install Node Modules

```sh
cd ~/fmdev/frontend

yarn install
```

Configure node memory limit to increase build

```sh
export NODE_OPTIONS=--max_old_space_size=3072
```

Build

```sh
cd ~/fmdev/frontend

yarn build
```

Rollback Max Space After Build

```sh
export NODE_OPTIONS=--max_old_space_size=512
```

## 1.4 Nginx

Install Nginx:

```sh
sudo apt update

sudo apt install nginx
```

Adjusting the Firewall:

```sh
sudo ufw allow 'Nginx Full'
```

Checking your Web Server

At the end of the installation process, Ubuntu 18.04 starts Nginx. The web server should already be up and running.

We can check with the systemd init system to make sure the service is running by typing:

```sh
systemctl status nginx
```

```sh
Output
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

When you have your server’s IP address, enter it into your browser’s address bar:

```sh
http://your_server_ip
```

Replace file `/etc/nginx/sites-available/default` to this script:

```sh
server {
    listen 80 default_server;
    listen [::]:80 default_server; 
    root /var/www/html;
    index index.html;

    server_name _;

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public";
    }

    location /api {
        include proxy_params;
        proxy_pass http://127.0.0.1:5000;
    }
}

```

Delete old data from default Nginx HTML Path:

```sh
rm -rf /var/www/html/*
```

Copy frontend build to HTML Path:

```sh
cp -R ~/fmdev/frontend/build/* /var/www/html
```

Reload Services:

```sh
systemctl restart nginx
```

### 1.5 Python


Use the following command to install prerequisites for Python before installing it.

```sh
sudo apt-get install build-essential checkinstall

sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
```

Download Python using following command from python official site. You can also download latest version in place of specified below.

```sh
cd /usr/src

sudo wget https://www.python.org/ftp/python/3.7.6/Python-3.7.6.tgz
```

Now extract the downloaded package.

```sh
sudo tar xzf Python-3.7.6.tgz
```

Use below set of commands to compile Python source code on your system using altinstall.

```sh
cd Python-3.7.6

sudo ./configure --enable-optimizations

sudo make altinstall
```

`make altinstall` is used to prevent replacing the default python binary file /usr/bin/python.

Check Python Version

```sh
python3.7 -V
```

Install and Activate Virtualenv

```sh
cd backend

python3.7 -m venv venv

source venv/bin/activate
```

Install Python Requirements

```sh
pip install -r requirements.txt
```

Configure Gunicorn as Service:

```sh
nano /etc/systemd/system/fmdev.service
```

Copy and Paste this code on `fmdev.service`. Remember to check if FMDEV path is correct.

```sh
[Unit]
Description=FMDEV Service
After=network.target

[Service]
User=root
WorkingDirectory=/root/fmdev/backend
Environment="PATH=/root/fmdev/backend/venv/bin"
ExecStart=/root/fmdev/backend/venv/bin/gunicorn -b 127.0.0.1:5000 "run:create_app('config')"
Restart=always

[Install]
WantedBy=multi-user.target
```

Reload Daemons:

```sh
sudo systemctl daemon-reload
```

Enable Service:

```sh
sudo systemctl start fmdev
```

Check if service its running:

```sh
sudo systemctl status fmdev
```

You will see a status like this:

```sh
● fmdev.service - FMDEV Service
   Loaded: loaded (/etc/systemd/system/fmdev.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2020-05-20 20:43:26 UTC; 9min ago
 Main PID: 26626 (gunicorn)
    Tasks: 2 (limit: 4704)
   CGroup: /system.slice/fmdev.service
           ├─26626 /root/fmdev/backend/venv/bin/python3.7 /root/fmdev/backend/venv/bin/gunicorn 
           └─26646 /root/fmdev/backend/venv/bin/python3.7 /root/fmdev/backend/venv/bin/gunicorn 

May 20 20:43:26 fmdev systemd[1]: Started FMDEV Service.
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Starting gunic
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Listening at: 
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26626] [INFO] Using worker: 
May 20 20:43:26 fmdev gunicorn[26626]: [2020-05-20 20:43:26 +0000] [26646] [INFO] Booting worker
```

## 1.6 Java

Install openjdk 11 from

```
https://jdk.java.net/archive/
```

## 1.7 Pentaho

Download Pentaho Data Integration community editon from:

```
https://privatefilesbucket-community-edition.s3.us-west-2.amazonaws.com/9.4.0.0-343/ce/client-tools/pdi-ce-9.4.0.0-343.zip
```

Move Pentaho Data Integration folder to user home folder

```
mv <path>/pdi-ce-9.4.0.0-343 [USER_HOME]/
```

Move the transformations folder into the Pentaho Data Integration folder

```
mv <path>/fmdev/etl/transformations [USER_HOME]/pdi-ce-9.4.0.0-343/data-integration/
```

Set the Pentaho Data Integration location at carte.sh

```
nano <path>/fmdev/carte.sh
```

Configure the Pentaho Data Integration location at <path>/fmdev/backend/.env.development

```
nano <path>/fmdev/backend/.env.development
```

```
DB_HOST=localhost
DB_USER=root
DB_PORT=5432
DB_PWD=1234
DB_NAME=fmdev
CARTE_HOST=localhost
CARTE_PORT=8081
CARTE_USER=cluster
CARTE_PASS=cluster
#Change [USER_HOME] to user home path
CARTE_LOCATION=[USER_HOME]/pdi-ce-9.4.0.0-343/data-integration/transformations
```

# 2. Start project
Run the following commands to start the project
```
export JAVA_HOME="[JAVA PATH]"
export PATH=$PATH:$JAVA_HOME/bin

service postgresql start
service nginx start
source ~/.bashrc
/app/fmdev/carte.sh &
cd /app/fmdev/backend
source venv/bin/activate
venv/bin/gunicorn --reload -b 127.0.0.1:5000 "run:create_app('config')"
```

# 3. Local Development

## 3.1 Backend Module

```sh
cd backend
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

## 3.2 Manage Database (Flask-Migrate)

```sh
python migrate.py db migrate
python migrate.py db upgrade
```

## 3.3 Frontend Module

```sh
cd frontend
yarn install
yarn start
```

## Analysis Module (For view jupyter notebook analysis - Not required)

```sh
cd analysis
python3.7 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
jupyter notebook --ip=127.0.0.1
```
# 4. How to use
## 4.1 Contexts

To upload a context the document must be a JSON and must be on this specific format:

```
{"metadados": {
    "cabecalho": {
      "titulo": "Iris 2",
      "descricao": "Dados teste iris"
    },
    "campos": [
      {
        "codigo": "sepal.length",
        "descricao": "Sepal Length",
        "tipo": "Num",
        "tamanho": 100,
        "valores_permitidos": ""
      },
      {
        "codigo": "sepal.width",
        "descricao": "Sepal Width",
        "tipo": "Num",
        "tamanho": 50,
        "valores_permitidos": ""
      },
      {
        "codigo": "sepal.length",
        "descricao": "Petal Length",
        "tipo": "Num",
        "tamanho": 10,
        "valores_permitidos": ""
      },
      {
        "codigo": "variety",
        "descricao": "Variety",
        "tipo": "Num",
        "tamanho": 10,
        "valores_permitidos": ""
      }
    ]
  }
}
```
