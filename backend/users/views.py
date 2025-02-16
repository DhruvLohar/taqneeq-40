from random import randint
from rest_framework import viewsets, status
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.utils import html
from django.template.loader import render_to_string
from rest_framework.permissions import IsAuthenticated

from backend import settings
from backend.authentication import CookieAuthentication
from backend.responses import EnhancedResponseMixin

from core.views import *
from .models import *
from .serializers import *

class AuthMixin:
    
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
    
    @action(detail=False, methods=['POST'], permission_classes=[])
    def getOTPOnEmail(self, request, pk=None):
        uid = request.data.get("uid")
        
        try:
            user = User.objects.get(id=uid)
            
            generated_otp = randint(10000, 99999)
            email_sent = self.send_otp_on_email(
                "PDFSummarizer | OTP Authentication",
                "otp_email_template.html",
                user.email,
                context={
                    "date": timezone.now().strftime("%d %B, %Y"),
                    "username": user.name,
                    "generated_otp": generated_otp
                }
            )
            
            if email_sent:
                user.valid_otp = generated_otp
                user.save()
                return Response(
                    data="Email was sent on the specified email",
                    status=status.HTTP_200_OK
                )
            return Response(data={"detail": "Something went wrong sending the email"}, status=status.HTTP_417_EXPECTATION_FAILED)
        except User.DoesNotExist:
            return Response(data="User", status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['POST'], permission_classes=[])
    def verifyOTPOnEmail(self, request, pk=None):
        uid = request.data.get("uid")
        entered_otp = request.data.get("otp")
        
        try:
            user = User.objects.get(id=uid)
            
            if user.valid_otp == int(entered_otp):

                user.generateToken()
                user.is_active = True
                user.last_login = timezone.now()
                user.save()
                
                return Response(data={
                    "verified": True,   
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "access_token": user.access_token
                }, status=status.HTTP_200_OK)
            return Response(data={"detail": "Invalid OTP. Please try again"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(data="User", status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['POST'], permission_classes=[])
    def signUpSignIn(self, request):
        email = request.data.get("email")
        
        try:
            user = User.objects.get(email=email)
            
            return Response(data={
                "id": user.id,
                "verified": user.is_active,
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            name = request.data.get("name")
            email = request.data.get("email")
            
            if not name or not email:
                return Response(data={"detail": "Name and phone number are required"}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = UserSerializer(data=request.data)
            
            if serializer.is_valid():
                user = serializer.save()
                user.is_active = False
                user.save()
            
                return Response(data={
                    "id": user.id,
                    "verified": False,
                }, status=status.HTTP_200_OK)
            
            return Response(
                data={"detail": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
            
class UserAPIView(
    AuthMixin,
    viewsets.ModelViewSet,
    
    JournalMixin,
    RoadmapMixin,
    
    EnhancedResponseMixin
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # kon aa sakta hai
    authentication_classes = [CookieAuthentication] # jo aara woh kon hai

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
        
    @action(detail=False, methods=['GET'])
    def getProfile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['POST'])
    def onboarding(self, request, pk=None):
        user = request.user
        serializer = OnboardingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
