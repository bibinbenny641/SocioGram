# Generated by Django 4.1.4 on 2023-03-11 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('followers', '0022_alter_posts_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]