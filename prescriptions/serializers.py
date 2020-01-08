from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Medicine, Doctor, Prescription, Reminder
User = get_user_model()

# do we want to add mobile to this so it can be accessed?
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MedicineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicine
        fields = ('id', 'name', 'url')

class PrescriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prescription
        fields = ('id', 'user', 'medicine', 'number_doses', 'doses_per_day', 'number_repeats', 'doctor')

class PopulatedPrescriptionSerializer(PrescriptionSerializer):

    user = UserSerializer()
    medicine = MedicineSerializer()
