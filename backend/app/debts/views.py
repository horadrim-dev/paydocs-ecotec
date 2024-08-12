from typing import Any
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .permissions import IsCityParamDefined
from . import serializers
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from .paginations import ApiPagination
from .filtersets import DebtorFilter
from .cities_params import CITIES_PARAMS
from .models import *
from datetime import datetime


class DebtorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides retrieve and list functions for the Debtor model 
    """
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsCityParamDefined, ) #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! isAuth
    pagination_class = ApiPagination
    filterset_class = DebtorFilter

    def get_queryset(self):
        city = self.request.query_params.get("gorod")
        return CITIES_PARAMS[city]["queryset"]

    def get_serializer_class(self):
        city = self.request.query_params.get("gorod", None)
        return CITIES_PARAMS[city]["debtor_serializer"]

    @action(detail=True, methods=['get'], 
            permission_classes=[IsCityParamDefined]) # !!!!!!!!!!!!!!!!!!!!IsAuthenticated
    def debts(self, request, pk=None):
        """
        View for getting debts list of debtor.
        """
        debtor = self.get_object()

        qs = debtor.debt_set.order_by("period")

        # filter qs by min date
        min_period = self.request.query_params.get("min_period", None)
        if min_period:
            try:
                min_period = datetime.strptime(min_period, "%m-%Y").date()
            except ValueError:
                pass
            else:
                qs = qs.filter(period__gte=min_period)

        # filter qs by max date
        max_period = self.request.query_params.get("max_period", None)
        if max_period:
            try:
                max_period = datetime.strptime(max_period, "%m-%Y").date()
            except ValueError:
                pass
            else:
                qs = qs.filter(period__lte=max_period)


        city = self.request.query_params.get("gorod")
        serializer_class = CITIES_PARAMS[city]["debt_serializer"]
        serializer = serializer_class(qs, many=True)
        return Response(serializer.data)