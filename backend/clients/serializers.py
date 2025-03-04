from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id',  # Include id for reference
            # Basic Information
            'name', 
            'phone_number', 
            'email', 
            'preferred_language', 
            'source',
            
            # Property Preferences
            'property_type', 
            'budget', 
            'preferred_locations', 
            'possession_timeline', 
            'amenities',
            
            # Voice & Transcription
            'voice_recording', 
            'transcription', 
            'key_tags',
            
            # Financial Details
            'loan_required', 
            'loan_amount',
            
            # Status Tracking
            'status', 
            'objections'
        ]
        
    def validate_phone_number(self, value):
        """
        Validate phone number format
        Add custom validation logic as needed
        """
        # Example basic validation (adjust as per your requirements)
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits")
        return value
    
    def validate_email(self, value):
        """
        Optional email validation
        """
        # You can add more complex email validation if required
        if value and '@' not in value:
            raise serializers.ValidationError("Enter a valid email address")
        return value