from django.urls import path
from .views import MedicineListView, MedicineSpecificView, PrescriptionListView, PrescriptionSpecificView, PrescriptionUserView

urlpatterns = [
    path('medicines/', MedicineListView.as_view()),
    path('medicines/<int:pk>/', MedicineSpecificView.as_view()),
    path('prescriptions/', PrescriptionListView.as_view()),
    path('prescriptions/<int:pk>/', PrescriptionSpecificView.as_view()),
    path('prescriptions/user/<int:fk>/', PrescriptionUserView.as_view()),
]
