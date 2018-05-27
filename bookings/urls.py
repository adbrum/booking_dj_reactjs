from django.urls import path

from bookings import views

app_name= 'bookings'

urlpatterns = [
    path('booking/', views.index, name='index'),
    path('bookings/<int:pk>', views.details, name='details'),
    path('booking/<int:pk>', views.detail, name='detail'),
    path('booking/create/',  views.create, name='create'),
    path('booking/delete/<int:pk>', views.delete, name='delete'),
]