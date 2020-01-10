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
        fields = ('id', 'user', 'medicine', 'number_days_doses', 'number_repeats', 'doctor')

class PrescriptionPutSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = '__all__'
        extra_kwargs = {'id' : {'required': False}, 'user' : {'required': False}, 'medicine' : {'required': False}, 'number_days_doses' : {'required': False}, 'number_repeats' : {'required': False}, 'doctor' : {'required': False}}

class PopulatedPrescriptionSerializer(PrescriptionSerializer):

    user = UserSerializer()
    medicine = MedicineSerializer()

class ReminderSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    prescription = PopulatedPrescriptionSerializer()
    doctor = DoctorSerializer()

    class Meta:
        model = Reminder
        fields = ('id', 'user', 'prescription', 'doctor', 'due_time', 'reminder_time', 'reminder_type', 'active')

class ReminderPutSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reminder
        fields = ('id', 'due_time', 'reminder_time', 'reminder_type', 'active')
        extra_kwargs = {'id' : {'required': False}, 'due_time' : {'required': False}, 'reminder_time' : {'required': False}, 'reminder_type' : {'required': False}, 'active' : {'required': False}}

