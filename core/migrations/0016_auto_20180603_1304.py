# Generated by Django 2.0.5 on 2018-06-03 13:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_event_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='hexColor',
            new_name='hex_color',
        ),
    ]
