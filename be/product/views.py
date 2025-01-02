from django.shortcuts import render
from .models import ProductImage,Product
# Create your views here.
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from account.permissions import IsStaff
from .serializers import ProductSerializer
from rest_framework.generics import ListAPIView
from review.models import Review

# 상품 등록
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):
    if not request.FILES.getlist('images'):
        return JsonResponse({'error': '이미지 1개 이상 필요합니다'}, status=400)
    
    price = request.POST.get('price')
    name = request.POST.get('name')
    description = request.POST.get('description')
    # stars_average  = request.POST.get('stars_average')


    if not all([description, price, name,]):
        return JsonResponse({'error': '모든 제품 필드를 입력해야 합니다'}, status=400)
    
    product = Product(price=price, name=name, description = description)
    product.save()



    images = []
    for file in request.FILES.getlist('images'):
        attachment = ProductImage(image=file, product=product)
        attachment.save()
        images.append(attachment)

    serializer = ProductSerializer(product)
    return JsonResponse(serializer.data, safe=False)


class PostListView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Override the default get_queryset method.
        Return all Product objects.
        """
        return Product.objects.all()
    
    def starsaverage(request):
        stars = Review.objects.filter(product_id=request.id)
        stars_average = sum(stars) // stars.length

        Product(stars_average = stars_average)