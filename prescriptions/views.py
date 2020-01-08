from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Medicine, Doctor, Prescription, Reminder
from .serializers import MedicineSerializer, ReminderSerializer

class MedicineListView(APIView):

    def get(self, _request):
        medicines = Medicine.objects.all()
        serialized_posts = MedicineSerializer(medicines, many=True)
        return Response(serialized_posts.data)

    def post(self, request):
        medicine = MedicineSerializer(data=request.data)
        if medicine.is_valid():
            medicine.save()
            return Response(medicine.data, status=HTTP_201_CREATED)
        return Response(medicine.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class MedicineSpecificView(APIView):

    def get(self, _request, pk):
        medicines = Medicine.objects.get(pk=pk)
        serialized_posts = MedicineSerializer(medicines)
        return Response(serialized_posts.data)

class ReminderListView(APIView):

    def get(self, _request):
        reminders = Reminder.object.all()
        serialized = ReminderSerializer(reminders, many=True)
        return Response(serialized.data)

    def post(self, request):
        reminder = ReminderSerializer(data=request.data)
        if reminder.is_valid():
            reminder.save()
            return Response(reminder.data, status=HTTP_201_CREATED)
        return Response(reminder.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class ReminderSpecificView(APIView):


    def get(self, _request, pk):
        reminders = Reminder.objects.get(pk=pk)
        serialized = ReminderSerializer(reminders)
        return Response(serialized.data)

    permission_classes = (IsAuthenticated, )

    def put(self, request, pk):
        request.data['user'] = request.user.id

        reminder = Reminder.objects.get(pk=pk)
        if reminder.owner.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
        updated_reminder = ReminderSerializer(reminder, data=request.data)
        if updated_reminder.is_valid():
            updated_reminder.save()
            return Response(updated_reminder.data)
        return Response(updated_reminder.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class ReminderUserView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, _request, user):
        reminders = Reminder.objects.get(user=user)
        serialized = ReminderSerializer(reminders)
        return Response(serialized.data)
