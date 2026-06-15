from .models import Nutricionista
from rest_framework import serializers

class NutricionistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutricionista
        fields = '__all__'