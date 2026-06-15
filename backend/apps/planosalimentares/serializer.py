from .models import Planoalimentar
from rest_framework import serializers

class PlanoalimentarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planoalimentar
        fields = '__all__'