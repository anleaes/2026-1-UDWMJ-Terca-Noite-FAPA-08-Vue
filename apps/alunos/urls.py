from django.urls import path, include
from rest_framework import routers
from . import views

app_name = 'avaliacoesfisicas'

router = routers.SimpleRouter()
router.register(
    '',
    views.AvaliacaofisicaViewSet,
    basename='avaliacoesfisicas'
)

urlpatterns = [
    path('listar/', views.listar_avaliacoesfisicas,
         name='listar_avaliacoesfisicas'),

    path('adicionar/', views.adicionar_avaliacaofisica,
         name='adicionar_avaliacaofisica'),

    path('editar/<int:id_avaliacaofisica>/',
         views.editar_avaliacaofisica,
         name='editar_avaliacaofisica'),

    path('excluir/<int:id_avaliacaofisica>/',
         views.deletar_avaliacaofisica,
         name='deletar_avaliacaofisica'),

    path('api/', include(router.urls)),
]