from rest_framework import serializers
from .models import Alimento

class AlimentoSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.CharField(
        source='categoriaalimento.nome',
        read_only=True
    )

    class Meta:
        model = Alimento
        fields = '__all__'