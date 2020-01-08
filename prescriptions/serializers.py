from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Medicine, Doctor, Prescription, Reminder
User = get_user_model()

# do we want to add mobile to this so it can be accessed?
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'mobile')

class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = ('id', 'name', 'url')


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = ('id', 'name', 'url_fragment')



class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = ('id', 'user', 'medicine', 'number_doses', 'doses_per_day', 'number_repeats', 'doctor')

class PopulatedPrescriptionSerializer(PrescriptionSerializer):

    user = UserSerializer()
    medicine = MedicineSerializer()

class ReminderSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    perscription = PrescriptionSerializer()
    doctor = DoctorSerializer()

    class Meta:
        model = Reminder
        fields = ('id', 'user', 'prescription', 'doctor', 'due_time', 'reminder_time', 'reminder_type', 'active')
