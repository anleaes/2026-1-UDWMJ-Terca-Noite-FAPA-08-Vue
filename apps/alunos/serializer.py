from rest_framework import serializers
from .models import Aluno

class AlunoSerializer(serializers.ModelSerializer):
    fichas_medicas = serializers.StringRelatedField(
        source='fichamedica',
        many=True,
        read_only=True
    )

    class Meta:
        model = Aluno
        fields = '__all__'