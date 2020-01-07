from django.contrib import admin
from .models import Prescription, Doctor, Medicine, Reminder

admin.site.register(Prescription)
admin.site.register(Doctor)
admin.site.register(Medicine)
admin.site.register(Reminder)
