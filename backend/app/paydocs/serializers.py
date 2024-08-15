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


class PaymentDocumentSettingsSerializer(serializers.Serializer):

    tarif_tko = serializers.FloatField()
    contacts_html = serializers.CharField()
    details_html = serializers.CharField()
    annotation_html = serializers.CharField()