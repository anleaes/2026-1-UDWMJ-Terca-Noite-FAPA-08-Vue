from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'avaliacoesfisicas'
router = routers.SimpleRouter()
router.register('', views.AvaliacaofisicaViewSet, basename='avaliacoesfisicas')

urlpatterns = [
    path('ver/<int:avaliacaofisica_id>/', views.ver_avaliacaofisica, name='ver_avaliacoesfisica'),
    path('', include(router.urls)),
]