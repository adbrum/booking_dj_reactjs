from django.contrib.auth.models import User
from django.db import models


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

class Event(models.Model):
    title = models.CharField(max_length=100)
    author = models.IntegerField()
    start = models.DateTimeField()
    end = models.DateTimeField()
    description = models.TextField(max_length=512)
    active = models.BooleanField()
    created_at = models.DateTimeField('criado em', auto_now_add=True)
    updated_at = models.DateTimeField('alterado em', auto_now=True)

    def __str__(self):
        return self.title
