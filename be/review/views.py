from django.shortcuts import render, get_object_or_404
from .models import ReviewImage,Review
# Create your views here.
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from account.permissions import IsStaff
from .serializers import ReviewSerializer,ReviewListSerializer
from rest_framework.generics import ListAPIView
from product.models import Product
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class PostListPagination(PageNumberPagination):
    page_size = 8




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_create(request):
    if not request.FILES.getlist('images'):
        return JsonResponse({'error': '이미지 1개 이상 필요합니다'}, status=400)
    
    review = request.POST.get('review')
    product_id = request.POST.get('product')  # 제품 ID
    subject = request.POST.get("subject")
    if int(request.POST.get('stars')) <1 or int(request.POST.get('stars')) > 5:
        return JsonResponse({'error':'별점은 1점부터 5점 사이여야함'},status = 400)
    else:
        stars= int(request.POST.get('stars'))

    product = Product.objects.get(id = product_id)

    if not all([review, stars,product]):
        return JsonResponse({'error': '모든 제품 필드를 입력해야 합니다'}, status=400)

    # 기존 product의 stars_average를 꺼내와서
    # 현재 stars를 추가하고 
    # stars_average // 기존 product의 리뷰 개수 + 1
    # 하고 다시 저장장
    existing_reviews_count = product.reviews.count()
    print(existing_reviews_count)
    

    reviews = Review.objects.filter(product_id=product_id)
    stars_list = list(reviews.values_list('stars', flat=True))  # flat=True로 튜플이 아닌 단일 값으로
    print(stars_list)
    print(sum(stars_list))
    print(stars)
    stars_average = (stars+sum(stars_list)) // (existing_reviews_count+1)
    product.stars_average = stars_average
    product.save()
    print(stars_average)
    # print(total_stars)
    # # 새로운 평균 값 계산
    # new_average = int(((total_stars * existing_reviews_count) + stars) // (existing_reviews_count + 1))
    # product.stars_average = new_average
    # product.save()


    reviews = Review(review = review ,product=product ,stars = stars,user = request.user,subject = subject)
    reviews.save()

    images = []

    for file in request.FILES.getlist('images'):
        attachment = ReviewImage(image=file, review=reviews)
        attachment.save()
        images.append(attachment)

    return JsonResponse({
        'message': '리뷰가 성공적으로 등록되었습니다.',
    }, status=201)



class ReviewListView(ListAPIView):
    queryset = Review.objects.all()  # 기본 쿼리셋
    serializer_class = ReviewListSerializer
    pagination_class = PostListPagination



@api_view(['GET'])
def review_detail(request, pk):
    # 특정 리뷰 조회
    review = get_object_or_404(Review, pk=pk)

    # 리뷰 데이터 직렬화
    serializer = ReviewSerializer(review)

    # 직렬화된 데이터를 JSON 형태로 반환
    return Response(serializer.data)
from io import BytesIO
import base64
import cv2
import numpy as np
import os
# @api_view(['POST'])
# def mojike_img_create(request):
#     # 업로드된 파일 가져오기
#     image_file = request.FILES.get("imgsrc")
#     print(image_file)
#     if not image_file:
#         return Response({"error": "이미지가 제공되지 않았습니다."}, status=400)
#     file_name = image_file.name
#     print(file_name)
#     image_bytes = image_file.read()
#     np_array = np.frombuffer(image_bytes, np.uint8)
#     image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

#     if image is None:
#         return Response({"error": "이미지를 처리할 수 없습니다."}, status=400)

#     # 모자이크 처리
#     dst = cv2.resize(image, dsize=(640, 480), interpolation=cv2.INTER_AREA)
#     dst2 = cv2.blur(dst, (50, 50), anchor=(-5, -5), borderType=cv2.BORDER_CONSTANT)
#     # 처리된 이미지를 저장
#     save_path = f"media/review_images/{file_name}"
#     os.makedirs(os.path.dirname(save_path), exist_ok=True)  # 디렉토리 생성
#     cv2.imwrite(save_path, dst2)  # 처리된 이미지 저장

#     # Base64 데이터 생성
#     _, buffer = cv2.imencode('.jpg', dst2)
#     base64_image = base64.b64encode(buffer).decode('utf-8')

#     return Response({
#         "message": "이미지가 성공적으로 처리되었습니다.",
#         "file_name": f"processed_{file_name}",
#         "file_path": save_path,
#         "base64_image": base64_image,
#     })
#     # image_id = request.F
#     # dst = cv2.imread(image, cv2.IMREAD_ANYCOLOR)
#     # dst2 = cv2.blur(dst, (100, 100), anchor=(-5, -5), borderType=cv2.BORDER_CONSTANT)


from io import BytesIO
from django.http import HttpResponse

@api_view(['POST'])
def mojike_img_create(request):
    image_file = request.FILES.get("imgsrc")
    if not image_file:
        return Response({"error": "이미지가 제공되지 않았습니다."}, status=400)

    image_bytes = image_file.read()
    np_array = np.frombuffer(image_bytes, np.uint8)
    print(np_array)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    if image is None:
        return Response({"error": "이미지를 처리할 수 없습니다."}, status=400)

    dst = cv2.resize(image, dsize=(640, 480), interpolation=cv2.INTER_AREA)
    dst2 = cv2.blur(dst, (50, 50), anchor=(-5, -5), borderType=cv2.BORDER_CONSTANT)

    # 이미지를 바이트 데이터로 변환
    _, buffer = cv2.imencode('.jpg', dst2)
    io_buffer = BytesIO(buffer)

    # 파일 응답 생성
    response = HttpResponse(io_buffer, content_type="image/jpeg")
    response["Content-Disposition"] = "attachment; filename=processed_image.jpg"
    return response


class Review_id_list(ListAPIView):
    queryset = Review.objects.all()  # 모든 리뷰 가져오기
    serializer_class = ReviewSerializer  # 시리얼라이저 지정
    print(queryset)