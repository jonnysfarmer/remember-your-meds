from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED
from .models import Medicine, Doctor, Prescription, Reminder
from .serializers import MedicineSerializer, PrescriptionSerializer, PopulatedPrescriptionSerializer

class MedicineListView(APIView):

    def get(self, _request):
        medicines = Medicine.objects.all()
        serializer = MedicineSerializer(medicines, many=True)
        return Response(serializer.data)

class MedicineSpecificView(APIView):

    def get(self, _request, pk):
        medicines = Medicine.objects.get(pk=pk)
        serializer = MedicineSerializer(medicines)
        return Response(serializer.data)

class PrescriptionListView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request):
        prescriptions = Prescription.objects.all()
        serializer = PopulatedPrescriptionSerializer(prescriptions, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id
        prescription = PrescriptionSerializer(data=request.data)
        if prescription.is_valid():
            prescription.save()
            return Response(prescription.data, status=HTTP_201_CREATED)
        return Response(prescription.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class PrescriptionSpecificView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, _request, pk):
        prescription = Prescription.objects.get(pk=pk)
        serializer = PopulatedPrescriptionSerializer(prescription)
        return Response(serializer.data)

    def put(self, request, pk):
        request.data['user'] = request.user.id
        prescription = Prescription.objects.get(pk=pk)
        if prescription.user.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
        updated_prescription = 