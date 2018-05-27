from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers

from bookings import views
from bookings.views import api_login

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'details', views.DetailsViewSet)


urlpatterns = [
  path('', include('bookings.urls'), name='bookings'),
  path('login/', api_login, name='login'),
  path('api/', include(router.urls)),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('api-auth/logout/', include('rest_framework.urls', namespace='logout')),
  re_path('.*', TemplateView.as_view(template_name='index.html')),
  path('admin/', admin.site.urls),
]

