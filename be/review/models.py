from django.db import models
from account.models import User
from product.models import Product
# Create your models here.

class Review(models.Model):
    subject =models.TextField()
    review = models.TextField()  # 리뷰 텍스트
    stars = models.IntegerField()  # 별점 (1~5 사이의 값을 고려)
    comment = models.TextField(blank=True, null=True)  # 댓글 (선택 사항)
    created_at = models.DateField(auto_now_add=True)  # 리뷰 생성 날짜 자동 저장
    user = models.ForeignKey(
        User,  # Django 기본 User 모델 참조
        on_delete=models.CASCADE,  # 관련 사용자 삭제 시 리뷰도 삭제
        related_name='reviews'  # 역참조 이름 설정
    )
    product = models.ForeignKey(
        Product,  # 참조할 상품 모델
        on_delete=models.CASCADE,  # 상품 삭제 시 리뷰도 삭제
        related_name='reviews'  # 상품이 가진 리뷰들 참조
    )

class ReviewImage(models.Model):
    review = models.ForeignKey(
        Review,  # Review 모델과 연결
        on_delete=models.CASCADE,  # 리뷰 삭제 시 이미지도 삭제
        related_name='images'  # 리뷰의 이미지 역참조 이름 설정
    )
    image = models.ImageField(upload_to='review_images/')  # 이미지 업로드 경로 지정
    uploaded_at = models.DateTimeField(auto_now_add=True)  # 이미지 업로드 시간 저장