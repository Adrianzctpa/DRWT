FROM python:3.10.5-alpine3.16

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk update && apk add build-base libffi-dev

RUN apk add --update npm

COPY ./djangoreactfw/requirements.txt .

COPY ./djangoreactfw/reactfend/package*.json ./

RUN pip3 install --no-cache-dir -r requirements.txt

RUN npm install

COPY . .

# RUN python3 djangoreactfw/manage.py makemigrations && python3 djangoreactfw/manage.py migrate

RUN ls

CMD [ "python3" ]