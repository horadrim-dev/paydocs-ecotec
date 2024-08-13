from django_filters import rest_framework as filters
from .models import *

class PaymentDocumentFilter(filters.FilterSet):
    ls = filters.CharFilter(lookup_expr='icontains')
    fio = filters.CharFilter(lookup_expr='icontains')
    ad = filters.CharFilter(lookup_expr='icontains')
    gorod = filters.CharFilter(lookup_expr='exact')
    period = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = PaymentDocument
        fields = ['ls', 'fio', 'ad', 'gorod', 'period']