from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Reservation
from .serializers import ReservationSerializer
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_date(request):
    # 데이터베이스에서 모든 예약 날짜 가져오기
    reservations = Reservation.objects.all()

    # 원하는 포맷으로 변환하여 리스트 생성
    formatted_dates = [
        reservation.Year_Month_Date_Hour_Minute.strftime('%Y-%m-%d %H:%M:%S')
        for reservation in reservations
    ]

    # 리스트로 반환
    return Response(formatted_dates)
import environ

env = environ.Env()
environ.Env.read_env()

@api_view(['POST'])
def create_reservation(request):
    # Reservation.objects.all
    # reservation = Reservation(Year_Month_Date_Hour_Minute=reservation_date,user=request.user)
    # for i in Reservation.objects.Year_Month_Date_Hour_Minute:
    #     if i == reservation_date:
    #         return JsonResponse('message : false',status = 400)
    #     else:
    #         reservation = Reservation(Year_Month_Date_Hour_Minute=reservation_date,user=request.user)

    reservation_date = request.POST.get('date')  # 예약 날짜 파라미터
    user = request.user  # 현재 로그인된 사용자            # Reservation 테이블에서 동일한 날짜의 예약이 있는지 확인
    if Reservation.objects.filter(Year_Month_Date_Hour_Minute=reservation_date).exists():
        return JsonResponse({'message': 'false', 'error': 'Reservation already exists'}, status=400)

        # 예약 생성 및 저장
    reservation = Reservation(Year_Month_Date_Hour_Minute=reservation_date, user=user)
    reservation.save()

    return JsonResponse({'message': 'Reservation created successfully'}, status=201)
import requests

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests  # requests 모듈 임포트
from datetime import datetime
import pytz
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_aligo_sms(request):
    to_phone_number = request.data.get("phone_number", "")
    date_time = request.data.get("date_time", "알 수 없음")
    try:
        utc_time = datetime.strptime(date_time, "%Y-%m-%dT%H:%M:%S.%fZ")
        kst = pytz.timezone("Asia/Seoul")
        local_time = utc_time.replace(tzinfo=pytz.utc).astimezone(kst)
        formatted_time = local_time.strftime("%Y-%m-%d %H:%M:%S")
    except Exception as e:
        formatted_time = "시간 변환 실패"

    message = f"""
    예약이 완료되었습니다
    예약시간 : {formatted_time}
    """

    api_url = "https://apis.aligo.in/send/"
    payload = {
        "key": env('ALIGO_KEY'),
        "user_id": env('ALIGO_USER_ID'),
        "sender": env('ALIGO_SENDER'),
        "receiver": to_phone_number,
        "msg": message,
        "testmode_yn": "Y"
    }

    try:
        response = requests.post(api_url, data=payload)
        response_data = response.json()
        return Response(response_data)  # Response 객체로 반환
    except Exception as e:
        print(f"SMS 전송 중 오류 발생: {e}")
        return Response({"error": "SMS 전송 실패"}, status=500)