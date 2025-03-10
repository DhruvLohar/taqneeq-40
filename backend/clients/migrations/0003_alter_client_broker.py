# Generated by Django 5.1.6 on 2025-03-05 04:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_client_broker'),
        ('users', '0004_user_current_phase'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='broker',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='clients', to='users.user'),
        ),
    ]
