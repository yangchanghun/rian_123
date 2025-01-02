from rest_framework import serializers

from .models import  Product,ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')


# post list
class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ('id', 'description', 'name', 'price', 'stars_average','images')