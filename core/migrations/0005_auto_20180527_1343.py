# Generated by Django 2.0.5 on 2018-05-27 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20180518_0846'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='author',
            field=models.IntegerField(),
        ),
    ]
