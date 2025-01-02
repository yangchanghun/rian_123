from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import kakaologin,kakaosignup

from .views import SignupAPI,me,check_token

# config path('api/', include('account.urls')),
urlpatterns = [
    # path('me/', api.me, name='me'),
    path('signup/', SignupAPI.as_view(), name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/',me,name="me"),
    path('check/',check_token,name="check_token"),
    path('kakaologin',kakaologin,name="kakaologin"),
    path('kakaosignup/',kakaosignup,name="kakaosignup"),
]