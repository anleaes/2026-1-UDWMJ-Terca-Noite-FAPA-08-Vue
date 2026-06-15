from .models import Alimento
from rest_framework import serializers

class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = '__all__'