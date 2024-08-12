from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'debtors', views.DebtorViewSet, basename="debtors")

urlpatterns = [
    path('', include(router.urls)),
]