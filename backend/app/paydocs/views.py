from typing import Any
from rest_framework import viewsets
from . import serializers
from .models import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from debts.paginations import ApiPagination
from .filtersets import PaymentDocumentFilter


class PaymentDocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides retrieve and list functions for the Kvitok model 
    """
    queryset = PaymentDocument.objects.all()
    serializer_class = serializers.PaymentDocumentSerializer
    authentication_classes = (JWTAuthentication,)
    # permission_classes = (IsAuthenticated, )
    pagination_class = ApiPagination
    filterset_class = PaymentDocumentFilter


class PaymentDocumentCityListViewSet(viewsets.mixins.ListModelMixin,
                             viewsets.GenericViewSet):
    """
    Provides list of cities from PaymentDocument model
    """
    queryset = PaymentDocument.objects.order_by().values('gorod').distinct()
    serializer_class = serializers.PaymentDocumentCityListSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, )