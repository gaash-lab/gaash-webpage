FROM python:3.13-slim AS builder

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN apt-get update && apt-get install -y \
    build-essential \
    libfreetype6-dev \
    libharfbuzz-dev \
    libjpeg-dev \
    zlib1g-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Make start.sh executable
RUN chmod +x /app/start.sh

# Ensure static and media dirs exist
RUN mkdir -p /app/staticfiles /app/media

EXPOSE 8000

CMD ["/app/start.sh"]