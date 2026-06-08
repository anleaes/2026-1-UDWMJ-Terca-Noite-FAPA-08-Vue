from rest_framework import serializers
from .models import Avaliacaofisica

class AvaliacaofisicaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.CharField(
        source='aluno.nome',
        read_only=True
    )

    class Meta:
        model = Avaliacaofisica
        fields = '__all__'