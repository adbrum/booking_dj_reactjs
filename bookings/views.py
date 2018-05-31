import json

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from bookings.serialyzers import UserSerializer, GroupSerializer, BookingSerializer
from core.models import Booking, Event

from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({"user": user.pk})
        # return Response(status=status.HTTP_200_OK)
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
    # a = json.dumps(_all)
    print(_all)
    return JsonResponse(list(_all), safe=False)

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
def details(request, pk):
    details = Event.objects.filter(author=pk).values()

    return JsonResponse(list(details), safe=False)


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

        details = Event.objects.filter(author=data['author']).values()

        return JsonResponse(list(details), safe=False)

@login_required
def edit(request, pk):
    data = json.loads(request.body.decode('utf-8'))
    print('DATA: ', data['description'])
    booking = Event.objects.get(pk=pk)
    booking.title = data['title']
    booking.description = data['description']
    booking.save()

    details = Event.objects.filter(author=data['author']).values()

    return JsonResponse(list(details), safe=False)

@login_required
def delete(request, pk):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        entry = get_object_or_404(Event, pk=pk)
        entry.delete()

        details = Event.objects.filter(author=data['author']).values()

        return JsonResponse(list(details), safe=False)


# def booking_create(request):
#     data = dict()
#     if request.method == 'POST':
#         form = BookingForm(request.POST)
#         if form.is_valid():
#             form.save()
#             # data['form_is_valid'] = True
#         else:
#             data['form_is_valid'] = False
#     else:
#         form = BookingForm()
#
#     context = {'form': form}
#     data['html_form'] = render_to_string('bookings/partial_book_create.html',
#                                          context,
#                                          request=request)
#     # return JsonResponse(data)
#     return render(request, 'bookings/partial_book_create.html', {'form': form})
#
#

#
#
