from .models import Fichamedica
from rest_framework import serializers

class FichamedicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fichamedica
        fields = '__all__'