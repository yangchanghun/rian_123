FROM node:18-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN ["npm", "ci"]

# TypeScript 버전 수정 (추가된 명령어)
RUN ["npm", "uninstall", "typescript"]
RUN ["npm", "install", "typescript@4.9.5", "--save-dev"]

# 추가 의존성 설치
RUN ["npm", "install"]

# 애플리케이션 코드 복사
COPY . .

# 프론트엔드 애플리케이션 빌드
RUN ["npm", "run", "build"]
