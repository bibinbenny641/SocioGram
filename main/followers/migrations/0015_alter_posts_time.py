# Generated by Django 4.1.4 on 2023-02-16 07:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('followers', '0014_posts_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='time',
            field=models.DateTimeField(blank=datetime.datetime(2023, 2, 16, 12, 30, 42, 21315)),
        ),
    ]
