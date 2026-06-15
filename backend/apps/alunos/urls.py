from django.urls import path, include
from . import views
from rest_framework import routers

app_name = 'alunos'
router = routers.SimpleRouter()
router.register('', views.AlunoViewSet, basename='alunos')

urlpatterns = [
    path('listar/', views.listar_alunos, name='listar_alunos'),
    path('adicionar/', views.adicionar_aluno, name='adicionar_aluno'),
    path('editar/<int:id_aluno>/', views.editar_aluno, name='editar_aluno'),
    path('excluir/<int:id_aluno>/', views.deletar_aluno, name='deletar_aluno'),
    path('buscar/', views.pesquisar_alunos, name='pesquisar_alunos'),
    path('', include(router.urls)),
]