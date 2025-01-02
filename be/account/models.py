from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from django.conf import settings


class CustomUserManager(UserManager):
    def _create_user(self, real_name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, real_name=real_name, **extra_fields)

        # 비밀번호가 없는 소셜 로그인 사용자 처리
        if password:
            print("Setting password for user.")
            user.set_password(password)
        else:
            print("Setting unusable password for user.")
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_user(self, real_name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(real_name, email, password, **extra_fields)
    
    def create_superuser(self, real_name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(real_name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    real_name = models.CharField(max_length=15)
    phone_number = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)
    objects = CustomUserManager()


    # 카카오 로그인 관련 필드
    is_social_login =models.BooleanField(default =False)
    social_provider = models.CharField(max_length=50,null = True,blank=True)
    social_id = models.CharField(max_length=255,unique=True,null=True,blank=True)


    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def get_userimage(self):
        return settings.WEBSITE_URL + self.user_image.url