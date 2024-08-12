from django_filters import rest_framework as filters
from .models import *

class DebtorFilter(filters.FilterSet):
    ls = filters.CharFilter(lookup_expr='icontains')
    fio = filters.CharFilter(lookup_expr='icontains')
    dom = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = DebtorBase
        fields = ['ls', 'fio', 'dom', ]