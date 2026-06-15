from .models import Fichatreino
from rest_framework import serializers

class FichatreinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fichatreino
        fields = '__all__'