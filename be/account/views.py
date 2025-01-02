# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer,KakaoUserSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
import requests
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string


class SignupAPI(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def me(request):
    return JsonResponse({
        'id': request.user.id,
        'name': request.user.real_name,
        'email': request.user.email,
        'phone_number':request.user.phone_number
    })

@api_view(['GET'])
def logout(request):
    pass

@api_view(['GET'])
def check_token(request):
    if not request.user.is_authenticated:
        return Response({"error": "Invalid or expired token."}, status=401)
    
    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email
    })




import environ

env = environ.Env()
environ.Env.read_env()

@api_view(['GET'])
def kakaologin(request):
    code = request.GET.get('code')
    print("Received code:", code)

    if not code:
        return Response({'error': 'No code provided'}, status=400)




    # 액세스 토큰 요청
    token_url = "https://kauth.kakao.com/oauth/token"
    data = {
        'grant_type': env('KAKAO_GRANT_TYPE'),
        'client_id': env('KAKAO_CLIENT_ID'),
        'redirect_uri': env('KAKAO_REDIRECT_URI'),
        'code': code,
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(token_url, data=data, headers=headers)

    if response.status_code != 200:
        return Response({'error': 'Failed to get access token', 'details': response.json()}, status=response.status_code)

    access_token = response.json().get('access_token')
    print("Access Token:", access_token)

    # 사용자 정보 요청
    headers = {
        'Authorization': f"Bearer {access_token}",
        'Content-Type': "application/x-www-form-urlencoded;charset=utf-8",
    }
    profile = requests.post('https://kapi.kakao.com/v2/user/me', headers=headers)

    if profile.status_code != 200:
        return Response({'error': 'Failed to fetch user profile', 'details': profile.json()}, status=profile.status_code)

    # 사용자 정보 데이터 추출
    profile_data = {
        'nickname': profile.json().get('properties').get('nickname'),
        'email': profile.json().get('kakao_account').get('email'),
    }
    nickname = profile.json().get('properties').get('nickname')
    email =  profile.json().get('kakao_account').get('email')

    social_id = profile.json()["id"]
    print(profile.json().get('id'))
    print(profile.json().get('kakao_account').get('email'))
    kakao = False
    if User.objects.filter(email=email).exists():  # 사용자 정보가 이미 저장되어 있다면
        kakao = True
        user, created = User.objects.get_or_create(  # 사용자 생성 또는 조회
            social_id=social_id,
            defaults={"email": email}  # 새 사용자 생성 시에만 기본값 설정
        )
        # JWT 토큰 생성
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        # 응답 데이터 반환
        return Response({
            "refresh": str(refresh),
            "access": access,
            "user": {
                "id": user.id,
                "email": user.email,
                "real_name": user.real_name,
            },
            "kakao": kakao
        })
    else: #저장되어있지 않다면 회원가입해야함 그래서 상죠자 정보를 주고
        return Response(data = {'profile_data':profile_data,'kakao':kakao,'social_id':social_id},status=200)


@api_view(['POST'])
def kakaosignup(request):
    data = request.data
    serializer = KakaoUserSerializer(data = data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Social login user created successfully."},
            status=status.HTTP_201_CREATED
        )
    else:
        print("Serializer Errors:", serializer.errors)
        return Response(
            serializer.errors,  # 검증 실패 시 에러 반환
            status=status.HTTP_400_BAD_REQUEST
        )

