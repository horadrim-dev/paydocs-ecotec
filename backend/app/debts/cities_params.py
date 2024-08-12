from . import serializers
from .models import *

CITIES_PARAMS = {
    "prk": { 
        "queryset": DebtorProkopyevsk.objects,
        "debtor_serializer": serializers.DebtorProkopyevskSerializer,
        "debt_serializer": serializers.DebtProkopyevskSerializer,
    },
    "artyshta": { 
        "queryset": DebtorArtyshta.objects,
        "debtor_serializer": serializers.DebtorArtyshtaSerializer,
        "debt_serializer": serializers.DebtArtyshtaSerializer,
    },
    "krasnobrod": { 
        "queryset": DebtorKrasnobrod.objects,
        "debtor_serializer": serializers.DebtorKrasnobrodSerializer,
        "debt_serializer": serializers.DebtKrasnobrodSerializer,
    },
    "dubrovo": { 
        "queryset": DebtorDubrovo.objects,
        "debtor_serializer": serializers.DebtorDubrovoSerializer,
        "debt_serializer": serializers.DebtDubrovoSerializer,
    },
}