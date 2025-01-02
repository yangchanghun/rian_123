from rest_framework.decorators import api_view
from django.utils.crypto import get_random_string
from django.template.loader import render_to_string
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework import status
from .models import PermissonNumber

@api_view(['POST'])
def mailpermission(request):
# 인증 코드 생성
    verification_code = get_random_string(length=6, allowed_chars='1234567890')
    to_email = request.data.get('to_email')
    if PermissonNumber.objects.filter(email = to_email):
        PermissonNumber.objects.filter(email=to_email).delete()
        permissionnumber = PermissonNumber(email = to_email, number = verification_code)
        permissionnumber.save()
    else:
        permissionnumber = PermissonNumber(email = to_email, number = verification_code)
        permissionnumber.save()      
    if not to_email:
        return Response({"message":"이메일을 입력해주세요"},status=400) 
    print(to_email)
    subject = "리안 인증번호"
    message = verification_code
    context = {
        "verification_code": verification_code,
        "message": message,
        "subject": subject
    }
    html_mail = render_to_string("mail.html", context)
    send_mail(
    subject,
    message,
    "gory4848@naver.com",
    [to_email],
    html_message=html_mail
    )

    return Response({"message":"인증번호가 전송되었습니다" "","verification_code": verification_code}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def mailcheck(request):
    code = request.data.get('code')
    email = request.data.get('email')
    permission = PermissonNumber.objects.get(email=email)

    if str(permission.number) == str(code):
        return Response({"message":"인증되었습니다","permisson":True},status=200)
    else:
        return Response({"message":"인증번호가 다릅니다","permission":False},status=400)