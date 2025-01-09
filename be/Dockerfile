FROM python:3.10

# 패키지 업데이트 및 필요한 라이브러리 설치
RUN apt-get update && \
    apt-get install -y --no-install-recommends libgl1 libglib2.0-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY requirements.txt ./
RUN pip install -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# 포트 8000 노출
EXPOSE 8000

# Gunicorn 실행
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
