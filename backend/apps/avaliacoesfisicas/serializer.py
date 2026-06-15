from .models import Avaliacaofisica
from rest_framework import serializers

class AvaliacaofisicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacaofisica
        fields = '__all__'