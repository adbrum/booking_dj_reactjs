import json
from datetime import date

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from bookings.serialyzers import UserSerializer, GroupSerializer, BookingSerializer
from core.models import Booking, Event


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"user": user.pk})

    return Response(status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.filter().order_by('-created_at')
    serializer_class = BookingSerializer


class DetailsViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer


def index(request):
    _all = Booking.objects.all().values()

    return JsonResponse(list(_all), safe=False)


@login_required
def details(request, pk):
    details = Event.objects.filter(author=pk, active=True).values()

    return JsonResponse(list(details), safe=False)


@login_required
def details_today(request, pk):

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        start_date = data['start_date']
        end_date = data['end_date']
        details = Event.objects.filter(author=pk, start__date__range=(start_date, end_date)).values()
        print('DETAILS: ', type(details))

        return JsonResponse(list(details), safe=False)

    today = date.today()
    print('XXXXXXXXX: ', today)
    details = Event.objects.filter(author=pk, start__date=today, active=True).values()

    return JsonResponse(list(details), safe=False)


@login_required
def detail(request, pk):
    bookings = list()
    detail = Event.objects.get(pk=pk)
    bookings.append({
        "id": detail.id,
        "author": 1,
        "title": detail.title,
        "start": detail.start,
        "end": detail.end
    })

    return JsonResponse(bookings, safe=False)

@login_required
def create(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        booking = Event(
            author=data['author'],
            title=data['title'],
            description=data['description'],
            start=data['start'],
            end=data['end']
        )
        booking.save()

        details = Event.objects.filter(author=data['author'], active=True).values()

        return JsonResponse(list(details), safe=False)

@login_required
def edit(request, pk):
    data = json.loads(request.body.decode('utf-8'))
    print('DATA: ', data['description'])
    booking = Event.objects.get(pk=pk)
    booking.title = data['title']
    booking.description = data['description']
    booking.save()

    details = Event.objects.filter(author=data['author'], active=True).values()

    return JsonResponse(list(details), safe=False)

@login_required
def delete(request, pk):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        entry = get_object_or_404(Event, pk=pk)
        entry.active = False
        # entry.delete()
        entry.save()

        details = Event.objects.filter(author=data['author'], active=True).values()

        return JsonResponse(list(details), safe=False)
