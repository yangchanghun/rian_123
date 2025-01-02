from django.db import models
from account.models import User
# Create your models here.

class Reservation(models.Model):
    Year_Month_Date_Hour_Minute = models.DateTimeField()

    user = models.ForeignKey(
        User,  # Django 기본 User 모델 참조
        on_delete=models.CASCADE,  # 관련 사용자 삭제 시 리뷰도 삭제
        related_name='reservation'  # 역참조 이름 설정
    )