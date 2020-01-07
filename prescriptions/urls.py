from django.urls import path
from .views import MedicineListView, MedicineSpecificView

urlpatterns = [
    path('medicines', MedicineListView.as_view()),
    path('medicines/<int:pk>/', MedicineSpecificView.as_view())
]
