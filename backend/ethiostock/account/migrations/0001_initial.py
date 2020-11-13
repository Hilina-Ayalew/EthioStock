# Generated by Django 3.1.3 on 2020-11-13 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=20, unique=True)),
                ('date_joined', models.DateTimeField(auto_now=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('sex', models.CharField(max_length=6)),
                ('first_name', models.CharField(max_length=30)),
                ('user_type', models.CharField(max_length=16)),
                ('last_name', models.CharField(max_length=30)),
                ('phoneNo', models.CharField(max_length=13)),
                ('subcity', models.CharField(max_length=30)),
                ('woreda', models.IntegerField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
