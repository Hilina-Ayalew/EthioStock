# Generated by Django 3.0.3 on 2020-03-05 07:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('businessowner', '0001_initial'),
        ('stock', '0004_auto_20200305_1008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='businessowner.Businessowner'),
        ),
    ]
