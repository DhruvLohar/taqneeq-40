from rest_framework import serializers
from .models import Client
from messenger.models import ChatSession

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id',  # Include id for reference
            # Basic Information
            'broker',
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
            
            # Financial Details
            'loan_required', 
            'loan_amount',
            
            'status',
            'transcription',
            'extracted_details'
        ]