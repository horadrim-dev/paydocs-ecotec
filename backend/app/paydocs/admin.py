from django.contrib import admin
from .models import *


@admin.register(PaymentDocument)
class PaymentDocumentAdmin(admin.ModelAdmin):
    pass