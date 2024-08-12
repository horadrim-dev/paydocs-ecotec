from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'payment-documents', views.PaymentDocumentViewSet, basename="payment-documents")
router.register(r'payment-documents-city-list', views.PaymentDocumentCityListViewSet, basename="payment-documents-city-list")

urlpatterns = [
    path('', include(router.urls)),
]