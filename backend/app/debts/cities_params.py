from . import serializers
from .models import *

CITIES_PARAMS = {
    "prk": { 
        "queryset": DebtorProkopyevsk.objects,
        "debtor_serializer": serializers.DebtorProkopyevskSerializer,
        "debt_serializer": serializers.DebtProkopyevskSerializer,
    },
    "myski": { 
        "queryset": DebtorMyski.objects,
        "debtor_serializer": serializers.DebtorMyskiSerializer,
        "debt_serializer": serializers.DebtMyskiSerializer,
    },
    "krasnobrod": { 
        "queryset": DebtorKrasnobrod.objects,
        "debtor_serializer": serializers.DebtorKrasnobrodSerializer,
        "debt_serializer": serializers.DebtKrasnobrodSerializer,
    },
    "kiselevsk": { 
        "queryset": DebtorKiselevsk.objects,
        "debtor_serializer": serializers.DebtorKiselevskSerializer,
        "debt_serializer": serializers.DebtKiselevskSerializer,
    },
}