from django.contrib import admin
from .models import *
from .forms import PaymentDocumentSettingsForm

@admin.register(PaymentDocument)
class PaymentDocumentAdmin(admin.ModelAdmin):
    pass

@admin.register(PaymentDocumentSettings)
class PaymentDocumentAdmin(admin.ModelAdmin):
    form = PaymentDocumentSettingsForm

    def has_add_permission(self, request, obj=None):
        try:
            obj = PaymentDocumentSettings.objects.get()
        except PaymentDocumentSettings.DoesNotExist:
            return True

        return False