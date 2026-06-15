from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'alimentos'

router = routers.SimpleRouter()
router.register('', views.AlimentoViewSet, basename='alimentos')

urlpatterns = [
    path('listar/', views.listar_alimentos, name='listar_alimentos'),
    path('adicionar/', views.adicionar_alimento, name='adicionar_alimento'),
    path('editar/<int:id_alimento>/', views.editar_alimento, name='editar_alimento'),
    path('deletar/<int:id_alimento>/', views.deletar_alimento, name='deletar_alimento'),
    path('', include(router.urls)),
]