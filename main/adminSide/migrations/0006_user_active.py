# Generated by Django 4.1.4 on 2022-12-29 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminSide', '0005_remove_user_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]
