# Generated by Django 3.0.2 on 2020-01-08 10:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('prescriptions', '0007_merge_20200108_1050'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='active',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='doctor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to='prescriptions.Doctor'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='medicine',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medicine', to='prescriptions.Medicine'),
        ),
        migrations.AlterField(
            model_name='reminder',
            name='doctor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reminder', to='prescriptions.Doctor'),
        ),
        migrations.AlterField(
            model_name='reminder',
            name='prescription',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reminder', to='prescriptions.Prescription'),
        ),
        migrations.AlterField(
            model_name='reminder',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reminder', to=settings.AUTH_USER_MODEL),
        ),
    ]
