# Generated by Django 4.1.4 on 2023-03-11 17:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('followers', '0021_alter_posts_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='time',
            field=models.DateTimeField(blank=datetime.datetime(2023, 3, 11, 22, 57, 41, 464538)),
        ),
    ]
