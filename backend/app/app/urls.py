"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView
from rest_framework import routers
from debts.urls import router as debts_router
from paydocs.urls import router as paydocs_router

router = routers.DefaultRouter(trailing_slash=False)
router.registry.extend(debts_router.registry)
router.registry.extend(paydocs_router.registry)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('prometheus/', include('django_prometheus.urls')),
    path('api/', include(router.urls)),

]
