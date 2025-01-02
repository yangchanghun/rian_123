from .views import mailpermission,mailcheck
from django.urls import path

# config path('api/', include('account.urls')),
urlpatterns = [

    path('mailpermission/',mailpermission,name="mailpermission"),
    path('mailcheck/',mailcheck,name="mailcheck")
]