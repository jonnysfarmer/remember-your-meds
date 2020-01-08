from django.urls import path
from .views import MedicineListView, MedicineSpecificView, ReminderListView, ReminderSpecificView, ReminderUserView

urlpatterns = [
    path('medicines', MedicineListView.as_view()),
    path('medicines/<int:pk>/', MedicineSpecificView.as_view()),
    path('reminders', ReminderListView.as_view()),
    path('reminders/<int:pk>/', ReminderSpecificView.as_view()),
    path('reminders/user/<int:user>/', ReminderUserView.as_view())
]
