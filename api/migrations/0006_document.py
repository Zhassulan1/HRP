# Generated by Django 5.1.2 on 2024-10-19 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_vacancy_id_vacancyresponse_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nametxt', models.CharField(max_length=250)),
                ('owner_bin', models.CharField(max_length=12)),
                ('receiver_bin', models.CharField(max_length=12)),
                ('receiver_mail', models.EmailField(blank=True, max_length=50, null=True)),
                ('uf', models.URLField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]