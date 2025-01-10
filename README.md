# RIAN

## ⌨️ 기간 2024.12 - 2025.01 (약40일)
목차<br>
[목표](#목표)<br>
[주요기능](#주요-기능)<br>
[ERD](#ERD)<br>
[시스템아키텍처](#시스템-아키텍처)<br>
[개발환경](#개발환경)<br>
[배포](#배포)<br>
[CI/CD](#CI/CD)<br>
[기능소개](#기능소개)
- [JWT로그인](#장고-simple-JWT활용-로그인)
- [이메일인증회원가입](#이메일-인증-회원가입)
- [카카오API회원가입](#카카오API-활용-로그인&회원가입)
- [예약안내문자전송](#알리고API를-이용한-예약-안내-문자전송)
- [리뷰사진모자이크처리](#리뷰-사진-모자이크-처리)
<br>
[기능소개](#기능소개)
<br>
[CI/CD](#CI/CD)
##링크

## 🎯 목표
- 부모님의 피부관리실을 홍보하고 고객들이 쉽게 정보를 얻고 예약할 수 있는 홈페이지를 만든다

## ⭐️ 주요 기능
- 예약시 문자로 예약 안내내용 전송
- 후기 작성시 본인 사진 모자이크 처리 후 등록
## ERD
![image](https://github.com/user-attachments/assets/7419e052-33e4-412b-a657-cd77ee7e7de7)
## ⚙ 시스템 아키텍처
![image](https://github.com/user-attachments/assets/ef6fca99-c4a0-499e-9e8b-f573cd81f638)
<br>

## 🛠️ 개발환경
- 백엔드:Python,Django,PostgreSQL
- 프론트엔드:JavaScript,CSS3,HTML5,ReactJS
- 인프라:AWS,Docker,Nginx,Gunicorn,GitHubAction
  

# 기능소개

## 장고 simple JWT활용 로그인

코드보러가기
<br>
[백](https://github.com/yangchanghun/rian_123/blob/main/be/account/views.py) [프](https://github.com/yangchanghun/rian_123/blob/main/fe-rian/src/component/Login.js)
<br>
![image](https://github.com/user-attachments/assets/5b94de80-ddcf-4628-b1de-10eae01c24ac)
![로그인 JWT](https://github.com/user-attachments/assets/5bf62a1e-a880-4015-bfa7-4521f286c3b2)

<br>

## 이메일 인증 회원가입

코드보러가기
<br>
[백](https://github.com/yangchanghun/rian_123/blob/main/be/permissions/views.py) [프](https://github.com/yangchanghun/rian_123/blob/main/fe-rian/src/component/Signup.js)
<br>
![image](https://github.com/user-attachments/assets/cff57b15-c7c7-44bf-9ce2-e9f213d24b56)
![회원가입 mail인증 ](https://github.com/user-attachments/assets/bcf80bc8-7dbf-49a6-bf83-1da6b59c2c4d)

## 카카오API 활용 로그인&회원가입

코드보러가기
<br>
[백](https://github.com/yangchanghun/rian_123/blob/main/be/account/views.py) [프](https://github.com/yangchanghun/rian_123/blob/main/fe-rian/src/component/KakaoSignup.js)
<br>
![image](https://github.com/user-attachments/assets/eb68e3ed-46e0-41e5-a8e0-52da1a6df3d0)
![image](https://github.com/user-attachments/assets/6c4e7972-435e-4526-a299-aa404abb9522)
![image](https://github.com/user-attachments/assets/766878bd-d785-45c5-ab92-1cd6a783cf0a)
![카카오로그인   회원가입](https://github.com/user-attachments/assets/62c5c8e7-7f18-410c-8c39-6ac9d911854d)

## 알리고API를 이용한 예약 안내 문자전송

코드보러가기
<br>
[백](https://github.com/yangchanghun/rian_123/blob/main/be/reservation/views.py) [프](https://github.com/yangchanghun/rian_123/blob/main/fe-rian/src/component/Canlender.js)
<br>
![image](https://github.com/user-attachments/assets/502a1bd3-9e79-47e8-8bc7-af459f698019)
1. Request HTTP TCP/IP 통신을 이용하며 Client는 REST API 규격에 맞춰서 메시지 전송<br>
2. Response HTTP Server는 Client로부터 전달 받은 메시지 전송요청 응답<br>
3. SEND SMS Server는 통신사에 메시지를 전송<br>
4. Get Reports 통신사업자로부터 메시지 리포트 수신<br>
5. Response Reports 메시지 리포트 정상 수신 여부에 대한 응답을 Server에 전달<br>
![알리고api사용](https://github.com/user-attachments/assets/b9167316-6b4d-4753-9075-01a6e1dc4de1)


## 리뷰 사진 모자이크 처리

코드보러가기
<br>
[백](https://github.com/yangchanghun/rian_123/blob/main/be/review/views.py) [프](https://github.com/yangchanghun/rian_123/blob/main/fe-rian/src/component/ReviewCreate.js)
<br>
![리뷰모자이크](https://github.com/user-attachments/assets/4634b774-38b1-4671-9147-bb9804fa514b)

## EC2 배포 
![image](https://github.com/user-attachments/assets/902a8eb4-5215-428d-992e-85539aa21629)

[배포과정 보러가기](https://velog.io/@gory4848/series/%EB%A6%AC%EC%95%88%EB%B0%B0%ED%8F%AC)
<br>

## CI/CD
![image](https://github.com/user-attachments/assets/86e07824-01bd-4129-afe5-a4fedeb5b5da)

[CI/CD과정 보러가기](https://velog.io/@gory4848/series/CICD)
<br>
