FROM ubuntu:20.04 

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN ln -snf /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo America/Sao_Paulo > /etc/timezone

RUN apt-get update && apt-get install -y python3 python3-pip npm

COPY ./djangoreactfw/requirements.txt .

COPY ./djangoreactfw/reactfend/package*.json ./

RUN pip3 install --no-cache-dir -r requirements.txt

RUN npm install

RUN useradd --create-home django

COPY . .

CMD [ "python3" ]