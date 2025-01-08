FROM nginx:1.27.2-alpine

# 사용자 지정 Nginx 구성 복사
COPY ./hiconfig.conf /etc/nginx/conf.d/hiconfig.conf

# 정적 파일 복사 (Node.js에서 빌드된 결과물)
COPY ./build /usr/share/nginx/html

# 기본 구성 파일 제거
RUN rm /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
