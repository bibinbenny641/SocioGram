# Generated by Django 4.1.4 on 2023-03-08 07:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('followers', '0019_alter_posts_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='time',
            field=models.DateTimeField(blank=datetime.datetime(2023, 3, 8, 12, 40, 3, 370968)),
        ),
    ]
