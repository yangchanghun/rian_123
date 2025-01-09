FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# 포트 8000 노출
EXPOSE 8000


# Gunicorn 실행 (Django 애플리케이션 실행)
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]