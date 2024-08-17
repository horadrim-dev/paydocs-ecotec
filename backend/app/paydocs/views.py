from typing import Any
from rest_framework import viewsets, generics, mixins
from rest_framework.response import Response
from . import serializers
from .models import *
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from debts.paginations import ApiPagination
from .filtersets import PaymentDocumentFilter
from django.utils.decorators import method_decorator
from django.core.cache import cache
from django.views.decorators.cache import cache_page, never_cache

# @never_cache
class PaymentDocumentViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides retrieve and list functions for the PaymentDocument model 
    """
    queryset = PaymentDocument.objects.all()
    serializer_class = serializers.PaymentDocumentSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, )
    pagination_class = ApiPagination
    filterset_class = PaymentDocumentFilter


class PaymentDocumentCityListViewSet(mixins.ListModelMixin,
                             viewsets.GenericViewSet):
    """
    Provides list of cities from PaymentDocument model
    """
    queryset = PaymentDocument.objects.order_by().values('gorod').distinct()
    serializer_class = serializers.PaymentDocumentCityListSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, )


class PaymentDocumentSettingsViewSet(viewsets.ViewSet):
    """
    Provides singleton settings for payment document feature
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, )

    def list(self, request):
        serializer = serializers.PaymentDocumentSettingsSerializer(
                PaymentDocumentSettings.objects.get(pk=1)
            )
        return Response(serializer.data)