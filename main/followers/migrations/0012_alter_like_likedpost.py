# Generated by Django 4.1.4 on 2023-01-31 08:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('followers', '0011_like'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='likedPost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='liked_post', to='followers.posts'),
        ),
    ]