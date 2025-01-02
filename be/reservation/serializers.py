from rest_framework import serializers
from .models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    Year_Month_Date_Hour_Minute = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')  # 원하는 포맷 지정

    class Meta:
        model = Reservation
        fields = ['Year_Month_Date_Hour_Minute']