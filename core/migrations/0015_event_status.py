# Generated by Django 2.0.5 on 2018-06-03 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_event_hexcolor'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='status',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
    ]
