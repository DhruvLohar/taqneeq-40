# Generated by Django 5.1.6 on 2025-03-04 18:59

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clients', '0001_initial'),
        ('users', '0004_user_current_phase'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatSession',
            fields=[
                ('is_valid', models.BooleanField(default=True)),
                ('session_key', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('messages', models.JSONField(blank=True, default=list, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='client_chat_sessions', to='clients.client')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='user_chat_sessions', to='users.user')),
            ],
        ),
    ]
