from django_filters import rest_framework as filters
from .models import *

class DebtorFilter(filters.FilterSet):
    ls = filters.CharFilter(lookup_expr='icontains')
    fio = filters.CharFilter(lookup_expr='icontains')
    dom = filters.CharFilter(lookup_expr='icontains')
    # gorod = filters.CharFilter(lookup_expr='exact')

    class Meta:
        model = DebtorBase
        # fields = ['ls', 'fio', 'dom', 'gorod']
        fields = ['ls', 'fio', 'dom', ]

class DebtsFilter(filters.FilterSet):
    # min_price = filters.NumberFilter(field_name="price", lookup_expr='gte')
    # max_price = filters.NumberFilter(field_name="price", lookup_expr='lte')
    class Meta:
        model = DebtBase
        # fields = ['ls', 'fio', 'dom', 'gorod']
        fields = []