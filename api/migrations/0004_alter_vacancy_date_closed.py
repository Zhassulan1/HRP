# Generated by Django 5.1.2 on 2024-10-19 02:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_vacancy_employer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vacancy',
            name='date_closed',
            field=models.DateTimeField(default=None, null=True),
        ),
    ]
