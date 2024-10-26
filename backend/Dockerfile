FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=config.settings

CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "config.wsgi:application"]
