FROM node:18-alpine

# 작업 디렉터리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

RUN npm uninstall typescript
# TypeScript 버전 수정 (추가된 명령어)
RUN npm install typescript@4.9.5 --save-dev

# 의존성 설치 (legacy-peer-deps 옵션 추가)
RUN npm ci --legacy-peer-deps

# 애플리케이션 코드 복사
COPY . .

# 프론트엔드 애플리케이션 빌드
RUN npm run build -y
