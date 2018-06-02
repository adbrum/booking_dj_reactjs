from django.urls import path

from bookings import views

app_name= 'bookings'

urlpatterns = [
    path('booking/', views.index, name='index'),
    path('bookings/<int:pk>', views.details, name='details'),
    path('bookings/today/<int:pk>', views.details_today, name='details_today'),
    path('booking/<int:pk>', views.detail, name='detail'),
    path('booking/create/',  views.create, name='create'),
    path('booking/edit/<int:pk>',  views.edit, name='edit'),
    path('booking/delete/<int:pk>', views.delete, name='delete'),
]