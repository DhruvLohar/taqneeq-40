from rest_framework.serializers import ModelSerializer
from users.models import *

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = (
            'access_token', 'valid_otp', 'is_active', 'password'
        )
        

class OnboardingSerializer(ModelSerializer):
    class Meta:
        model = UserOnboarding
        fields = '__all__'