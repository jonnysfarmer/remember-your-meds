from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Medicine, Doctor, Prescription, Reminder
from .serializers import MedicineSerializer

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