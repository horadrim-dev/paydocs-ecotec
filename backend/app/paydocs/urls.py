from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'paydocs', views.PaymentDocumentViewSet, basename="paydocs")
router.register(r'paydocs-city-list', views.PaymentDocumentCityListViewSet, basename="paydocs-city-list")
router.register(r'paydocs-settings', views.PaymentDocumentSettingsViewSet, basename="paydocs-settings")

urlpatterns = [
    path('', include(router.urls)),
]