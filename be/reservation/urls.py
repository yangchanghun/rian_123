from .views import create_reservation,check_date,send_aligo_sms
from django.urls import path

# config path('api/', include('account.urls')),
urlpatterns = [
    # path('me/', api.me, name='me'),
    path('create_reservation', create_reservation, name='create_reservation'),
    path('check_date', check_date, name='check_date'),
    path('send_aligo_sms', send_aligo_sms, name='send_aligo_sms'),

] 