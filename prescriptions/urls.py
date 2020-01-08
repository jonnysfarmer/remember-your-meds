from django.urls import path
from .views import MedicineListView, MedicineSpecificView, ReminderListView, ReminderSpecificView, ReminderUserView, PrescriptionListView, PrescriptionSpecificView, PrescriptionUserView, broadcast_sms

urlpatterns = [
    path('medicines/', MedicineListView.as_view()),
    path('medicines/<int:pk>/', MedicineSpecificView.as_view()),
    path('reminders', ReminderListView.as_view()),
    path('reminders/<int:pk>/', ReminderSpecificView.as_view()),
    path('reminders/user/', ReminderUserView.as_view()),
    path('prescriptions/', PrescriptionListView.as_view()),
    path('prescriptions/<int:pk>/', PrescriptionSpecificView.as_view()),
    path('prescriptions/user/', PrescriptionUserView.as_view()),
    path('sms/test', broadcast_sms)

]
