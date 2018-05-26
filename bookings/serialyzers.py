'''
Created on 24-05-2018

@author: Adriano Leal 
'''


from django.contrib.auth.models import User, Group
from rest_framework import serializers

from core.models import Booking


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
        
class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'name', 'author', 'date', 'description')

        def create(self, validated_data):
            """
            Create and return a new `Snippet` instance, given the validated data.
            """
            return Booking.objects.create(**validated_data)


class DetailSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'name', 'author', 'date', 'description')
