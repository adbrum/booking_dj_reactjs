from django.contrib.auth.models import User
from django.db import models

def id_user (request):
    id = User.objects.get(pk = request.user.id)
    return id

class Booking(models.Model):
    name = models.CharField(max_length=100)
    author = models.IntegerField()
    date = models.DateField()
    description = models.TextField()
    created_at = models.DateTimeField('criado em', auto_now_add=True)
    updated_at = models.DateTimeField('alterado em', auto_now=True)

    def __str__(self):
        return self.name + ' ' + str(self.date)

    def short_description(self):
        return self.description[:15]
