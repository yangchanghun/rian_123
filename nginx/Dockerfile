FROM nginx:1.27.2-alpine

# Nginx 설정 복사
COPY ./nginx/hiconfig.conf /etc/nginx/conf.d/hiconfig.conf

# 빌드 결과 복사
COPY fe-rian/build /usr/share/nginx/html

# 기본 구성 파일 제거
RUN rm /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
