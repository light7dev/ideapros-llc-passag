from privacy_terms.models import PrivacyPolicy
from rest_framework import serializers


class PrivacySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = '__all__'
