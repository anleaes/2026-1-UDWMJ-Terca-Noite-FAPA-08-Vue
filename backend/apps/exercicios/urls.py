from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'exercicios'
router = routers.SimpleRouter()
router.register('', views.ExercicioViewSet, basename='exercicios')

urlpatterns = [
    path('listar/', views.listar_exercicios, name='listar_exercicios'),
    path('adicionar/', views.adicionar_exercicio, name='adicionar_exercicio'),
    path('editar/<int:id_exercicio>/', views.editar_exercicio, name='editar_exercicio'),
    path('deletar/<int:id_exercicio>/', views.deletar_exercicio, name='deletar_exercicio'),
    path('', include(router.urls)),
]