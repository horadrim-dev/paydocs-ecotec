from rest_framework import serializers
from .models import *


class DebtorProkopyevskSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorProkopyevsk
        fields = '__all__'

class DebtorArtyshtaSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorArtyshta
        fields = '__all__'

class DebtorKrasnobrodSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorKrasnobrod
        fields = '__all__'

class DebtorDubrovoSerializer(serializers.ModelSerializer):
    """Debtor model serializer"""
    class Meta:
        model = DebtorDubrovo
        fields = '__all__'


class DebtProkopyevskSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtProkopyevsk
        fields = '__all__'

class DebtArtyshtaSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtArtyshta
        fields = '__all__'

class DebtKrasnobrodSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtKrasnobrod
        fields = '__all__'

class DebtDubrovoSerializer(serializers.ModelSerializer):
    """Debt list serializer"""
    # name = serializers.CharField(source="gorod")
    class Meta:
        model = DebtDubrovo
        fields = '__all__'