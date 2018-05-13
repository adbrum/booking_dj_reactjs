from django.contrib.auth.models import User
from django.db import models

class Booking(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    created_at = models.DateTimeField('criado em', auto_now_add=True)
    updated_at = models.DateTimeField('alterado em', auto_now=True)

    def __str__(self):
        return self.name + ' ' + str(self.date)

    def short_description(self):
        return self.description[:15]
