# Generated by Django 5.1.6 on 2025-02-15 21:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='kanbanboard',
            old_name='project_phase',
            new_name='phase',
        ),
    ]
