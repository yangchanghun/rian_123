FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt 복사 및 의존성 설치
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 추가 의존성 설치
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 애플리케이션 파일 복사
COPY . /app/

# 포트 8000 노출
EXPOSE 8000

# Gunicorn 실행
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
