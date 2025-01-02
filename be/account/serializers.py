# serializers.py
from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'real_name', 'phone_number', 'password', 'password2']
        
    def validate_email(self, value):
        """이메일 중복 확인"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  # password2는 저장하지 않음
        user = User.objects.create_user(
            email=validated_data['email'],
            real_name=validated_data['real_name'],
            phone_number=validated_data.get('phone_number'),
            password=validated_data['password']
        )
        return user




class KakaoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['social_id', 'real_name', 'email', 'phone_number', 'social_provider', 'is_social_login']
        extra_kwargs = {
            'email': {'required': True},  # 이메일은 필수
            'real_name': {'required': True},  # 이름은 필수
            'social_id': {'required': True},  # 소셜 ID는 필수
        }

    def validate_email(self, value):
        """이메일 중복 확인"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_social_id(self, value):
        """소셜 ID 중복 확인"""
        if User.objects.filter(social_id=value).exists():
            raise serializers.ValidationError("A user with this social_id already exists.")
        return value

    def create(self, validated_data):
        """사용자 생성"""
        user = User.objects.create_user(
            real_name=validated_data['real_name'],
            email=validated_data['email'],
            social_provider=validated_data.get('social_provider', 'kakao'),
            social_id=validated_data['social_id'],
            is_social_login=True,
            phone_number=validated_data.get('phone_number')
        )
        return user
