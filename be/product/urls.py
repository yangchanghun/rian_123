from django.urls import path
from .views import create_product,PostListView
from django.conf import settings
from django.conf.urls.static import static
# config path('api/', include('account.urls')),
urlpatterns = [
    # path('me/', api.me, name='me'),
    path('create_product', create_product, name='create_product'),
    path('list', PostListView.as_view(), name='product_list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)