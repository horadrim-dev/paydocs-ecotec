from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'debtors', views.DebtorViewSet, basename="debtors")
# router.register(r'debtors/(?P<debtor_id>\d+)/debts', views.DebtsViewSet, basename="debts")
# router.register(r'debtors/<int:debtor_id>/debts', views.DebtsViewSet, basename="debts")
#  r'(?P<client_id>\d+)/requests',
#     views.ClientRequests,
#     basename='clients request api endpoint'
urlpatterns = [
    path('', include(router.urls)),
]