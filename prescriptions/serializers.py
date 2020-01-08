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

class ReminderSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    perscription = PerscriptionSerializer()
    doctor = DoctorSerializer()

    class Meta:
        model = Reminder
        fields = ('id', 'user', 'prescription', 'doctor', 'due_time', 'reminder_time', 'reminder_type', 'active')

