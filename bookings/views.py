import json
from datetime import date

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.template.loader import render_to_string

from core.models import Booking


def index(request):
    _all = Booking.objects.all()
    a = json.dumps(_all)
    print(_all)
    return JsonResponse(list(a))

def api(request):
    messages = list()
    for message in Message.objects.all():
        messages.append({
            'content': message.content,
            'time_ago': message.time_ago,
            'pk': message.pk,
            'author': message.author
        })
    return JsonResponse({'messages': messages})


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

def details(request, pk):
    bookings = list()
    details = Booking.objects.filter(author=pk)
    for detail in details:
        bookings.append({
            "id": detail.id,
            "author": 1,
            "name": detail.name,
            "date": detail.date,
            "description": detail.description
        })

    return JsonResponse(bookings, safe=False)

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
# def delete(request, pk):
#     # print('XXXXXXXXXxx', request.POST)
#     # if request.method == 'POST':
#     entry = get_object_or_404(Booking, pk=pk)
#     entry.delete()
#     return HttpResponseRedirect('/calendar')
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
