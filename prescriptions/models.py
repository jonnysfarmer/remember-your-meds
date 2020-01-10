# from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class Medicine(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

# deprioritised building this feature but adding to model in case we decide to do it as it's top of the 'stretch' list!
class Doctor(models.Model):
    name = models.CharField(max_length=200)
    url_fragment = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'

class Prescription(models.Model):
    # one user can have many prescriptions, but one prescription can only have one user
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    # medicine can belong to many users, and one user can have many prescriptions, but a prescription can only have one medicine
    medicine = models.ForeignKey(Medicine, related_name='medicine', on_delete=models.CASCADE)
    # we ask user to enter the number of DAYS DOSAGE their prescription contains
    number_days_doses = models.IntegerField(blank=True, null=True)
    # we can track how often we've alerted you to a prescription renewal, and compare with this to alert you to make a doctors appointment
    number_repeats = models.IntegerField(blank=True, null=True)
    # including optional doctor id in case we get to stretch goals
    doctor = models.ForeignKey(Doctor, related_name='doctor', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'{self.medicine}'

class Reminder(models.Model):
    # setup the reminder types
    REMINDER_TYPE_CHOICES = [
        ('take', 'Take medicine'),
        ('order a prescription for', 'Order prescription'),
        ('make an appointment for', 'Make doctors appointment')
    ]
    # one user can have many reminders, but one reminder can only have one user
    user = models.ForeignKey(User, related_name='reminder', on_delete=models.CASCADE)
    # one prescription can have many reminders, but one reminder can only have one prescription
    prescription = models.ForeignKey(Prescription, related_name='reminder', on_delete=models.CASCADE)
    # including optional doctor id in case we get to stretch goals
    doctor = models.ForeignKey(Doctor, related_name='reminder', on_delete=models.CASCADE, blank=True, null=True)
    due_time = models.DateTimeField()
    reminder_time = models.DateTimeField()
    reminder_type = models.CharField(max_length=30, choices=REMINDER_TYPE_CHOICES)
    active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.reminder_type} - {self.prescription} - {self.active}'
        