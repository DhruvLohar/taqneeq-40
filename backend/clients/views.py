from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from backend.authentication import CookieAuthentication

from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing client instances.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    authentication_classes = [CookieAuthentication]
    
    # Add filtering capabilities
    filter_backends = [
        DjangoFilterBackend, 
        filters.SearchFilter, 
        filters.OrderingFilter
    ]
    
    # Fields that can be filtered
    filterset_fields = [
        'source', 
        'status', 
        'budget', 
        'property_type', 
        'loan_required'
    ]
    
    # Fields that can be searched
    search_fields = [
        'name', 
        'phone_number', 
        'email', 
        'preferred_locations'
    ]
    
    # Fields that can be used for ordering
    ordering_fields = [
        'name', 
        'created_at',  # Assuming you have a created_at field
        'status'
    ]
    
    def get_queryset(self):
        """
        Optionally customize queryset based on request
        """
        return super().get_queryset()