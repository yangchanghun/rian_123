from rest_framework import serializers

from .models import  Review,ReviewImage
from account.models import User
class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ('id', 'image')



class ReviewSerializer(serializers.ModelSerializer):
    images = ReviewImageSerializer(read_only=True, many=True)
    user_name = serializers.SerializerMethodField()  # 사용자 이름 필드 정의

    class Meta:
        model = Review
        fields = ('id', 'stars', 'images', 'comment', 'review', 'user_name','subject')  # user_name 포함

    def get_user_name(self, obj):
        return obj.user.real_name  # user 객체의 real_name 필드 반환
    


class ReviewListSerializer(serializers.ModelSerializer):
    images = ReviewImageSerializer(read_only=True, many=True)

    class Meta:
        model = Review
        fields = ('id', 'stars', 'images', 'subject')  # user_name 포함
