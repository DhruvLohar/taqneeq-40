from rest_framework import viewsets, filters
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from rest_framework.response import Response

from django.core.mail import EmailMultiAlternatives
from django.utils import html
from django.template.loader import render_to_string
from backend.responses import EnhancedResponseMixin

from backend import settings
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet, EnhancedResponseMixin):
    """
    A viewset for viewing and editing client instances.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # authentication_classes = [CookieAuthentication]
    
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
    
    @staticmethod
    def send_otp_on_email(subject, template_name, email_to, context=None):
        try:
            email_template = render_to_string(template_name, context=context if context else {})
            template_content = html.strip_tags(email_template)
            email = EmailMultiAlternatives(subject, template_content, settings.EMAIL_HOST_USER, to=[email_to])
            email.attach_alternative(email_template, 'text/html')
            email.send()
            return True
        except Exception as e:
            print("Email Error: ", e)
            return False
        
    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer = serializer.save()
        name = request.data.get("name")
        email = request.data.get("email")
        
        email_sent = self.send_otp_on_email(
            f"Hello {name} | Dala.ai",
            "welcome_user.html",
            email,
            context={
                "date": timezone.now().strftime("%d %B, %Y"),
                "username": name,
                "url": f"http://localhost:3000/broker/2/d69056a2-1e03-4ede-90ee-e6b883646655/chat"
            }
        )
        
        if email_sent:
            return Response("works", status=status.HTTP_201_CREATED)
        
        return Response(data={"detail": "Something went wrong sending the email"}, status=status.HTTP_417_EXPECTATION_FAILED)
    
    @action(detail=True, methods=['GET'])
    def emailGen(self, request):
        pass