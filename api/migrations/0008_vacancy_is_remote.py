# Generated by Django 5.1.2 on 2024-10-19 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_vacancyresponse_is_accepted_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='vacancy',
            name='is_remote',
            field=models.BooleanField(default=False),
        ),
    ]
