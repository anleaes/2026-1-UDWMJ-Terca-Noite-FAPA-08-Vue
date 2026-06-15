from .models import Grupomuscular
from rest_framework import serializers

class GrupomuscularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupomuscular
        fields = '__all__'