from rest_framework import serializers
from .models import *


class DebtorProkopyevskSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorProkopyevsk
        fields = '__all__'

class DebtorMyskiSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorMyski
        fields = '__all__'

class DebtorKrasnobrodSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorKrasnobrod
        fields = '__all__'

class DebtorKiselevskSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorKiselevsk
        fields = '__all__'


class DebtProkopyevskSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtProkopyevsk
        fields = '__all__'

class DebtMyskiSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtMyski
        fields = '__all__'

class DebtKrasnobrodSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtKrasnobrod
        fields = '__all__'

class DebtKiselevskSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtKiselevsk
        fields = '__all__'