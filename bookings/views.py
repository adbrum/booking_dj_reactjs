import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from bookings.serialyzers import UserSerializer, GroupSerializer
from core.models import Booking

from django.contrib.auth.models import User, Group
from rest_framework import viewsets

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


def index(request):
    _all = Booking.objects.all().values()
    # a = json.dumps(_all)
    print(_all)
    return JsonResponse(list(_all), safe=False)

def detail(request, pk):
    bookings = list()
    detail = Booking.objects.get(pk=pk)
    bookings.append({
        "id": detail.id,
        "author": 1,
        "name": detail.name,
        "date": detail.date,
        "description": detail.description
    })

    return JsonResponse(bookings, safe=False)


@csrf_exempt
def details(request, pk):
    print(request)
    details = Booking.objects.filter(author=pk).values()

    return JsonResponse(list(details), safe=False)


@csrf_exempt
def create(request):
    data = json.loads(request.body.decode('utf-8'))
    if request.method == 'POST':
        bookings = []
        booking = Booking(
            name=data['name'],
            author=data['author'],
            date=data['date'],
            description=data['description']
        )

        booking.save()

        detail = Booking.objects.get(pk=booking.pk)
        bookings.append({
            "id": detail.id,
            "author": detail.author,
            "name": detail.name,
            "date": detail.date,
            "description": detail.description
        })

        return JsonResponse(bookings, safe=False)


@csrf_exempt
def delete(request, pk):
    if request.method == 'DELETE':
        entry = get_object_or_404(Booking, pk=pk)
        entry.delete()
        return JsonResponse({"true": "true"}, safe=False)

# def calendar(request):
#     today = date.today()
#     new_end = date.today()
#     # bookings = Booking.objects.filter(author=request.user, date__gte=today)
#     bookings = Booking.objects.filter(date__gte=today)
#     # print(datetime.today().strftime('%d-%m-%Y'))
#     print(today)
#
#     return render(request, 'bookings/calendar.html', {'bookings': bookings})


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
# def signup(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password1']
#             user = authenticate(username=username, password=password)
#             login(request, user)
#             return redirect('/calendar')
#     else:
#         form = UserCreationForm()
#
#     return render(request, 'registration/signup.html', {'form': form})
