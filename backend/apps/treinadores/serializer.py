from .models import Treinador
from rest_framework import serializers

class TreinadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treinador
        fields = '__all__'