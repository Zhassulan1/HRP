# Generated by Django 5.1.2 on 2024-10-19 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vacancyresponse',
            name='is_accepted',
        ),
        migrations.AddField(
            model_name='vacancyresponse',
            name='status',
            field=models.CharField(default='accepted', max_length=30),
            preserve_default=False,
        ),
    ]