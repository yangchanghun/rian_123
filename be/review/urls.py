from django.urls import path
from .views import review_create,review_detail,ReviewListView,mojike_img_create,Review_id_list
# config path('api/', include('account.urls')),
urlpatterns = [
    # path('me/', api.me, name='me'),
    path('review_create', review_create, name='review_create'),
    path('detail/<int:pk>', review_detail, name='review_create'),
    path('review_list', ReviewListView.as_view(), name='review_create'),
    path('mojike_img_create', mojike_img_create, name='mojike_img_create'),
    path('review_id_list', Review_id_list.as_view(), name='review_id_list'),

]