# Generated by Django 2.2.9 on 2020-01-13 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prescriptions', '0012_auto_20200113_0936'),
    ]

    operations = [
        migrations.AddField(
            model_name='reminder',
            name='edited',
            field=models.BooleanField(default=False),
        ),
    ]