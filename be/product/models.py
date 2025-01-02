from django.db import models
# from review.models import Review

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)  # 상품 이름
    description = models.TextField(blank=True, null=True)  # 상품 설명 (선택 사항)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # 상품 가격
    stars_average = models.IntegerField(default=0,blank=True)



class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,  # Review 모델과 연결
        on_delete=models.CASCADE,  # 리뷰 삭제 시 이미지도 삭제
        related_name='images'  # 리뷰의 이미지 역참조 이름 설정
    )
    image = models.ImageField(upload_to='product_image/')  # 이미지 업로드 경로 지정
    uploaded_at = models.DateTimeField(auto_now_add=True)  # 이미지 업로드 시간 저장
