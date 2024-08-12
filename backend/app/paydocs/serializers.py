from rest_framework import serializers
from .models import *


class PaymentDocumentSerializer(serializers.ModelSerializer):
    """PaymentDocument model serializer"""

    class Meta:
        model = PaymentDocument
        fields = '__all__'
    
class PaymentDocumentCityListSerializer(serializers.ModelSerializer):
    """PaymentDocument gorod list model serializer"""

    name = serializers.CharField(source="gorod")

    class Meta:
        model = PaymentDocument
        fields = ('name', )