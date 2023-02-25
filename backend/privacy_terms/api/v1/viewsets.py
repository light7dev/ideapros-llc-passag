from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import PrivacySerializer
from privacy_terms.models import PrivacyPolicy


class PrivacyPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PrivacySerializer
    queryset = PrivacyPolicy.objects.all()
    permission_classes = [AllowAny]
    http_method_names = ['get']

    def get_queryset(self):
        return self.queryset
