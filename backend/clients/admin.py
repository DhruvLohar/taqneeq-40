from django.contrib import admin
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    # Customize the list display to show key fields in the admin list view
    list_display = ('id', 'name', 'phone_number', 'email', 'source', 'status', 'budget')
    
    # Add filters for easy searching and categorization
    list_filter = ('source', 'status', 'budget', 'loan_required')
    
    # Add search fields to make finding clients easier
    search_fields = ('name', 'phone_number', 'email', 'preferred_locations')
    
    # Group fields for better organization in the admin interface
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'phone_number', 'email', 'preferred_language', 'source', 'broker')
        }),
        ('Property Preferences', {
            'fields': ('property_type', 'budget', 'preferred_locations', 
                       'possession_timeline', 'amenities')
        }),
        ('Voice & Transcription', {
            'fields': ('voice_recording', 'transcription', 'extracted_details')
        }),
        ('Financial Details', {
            'fields': ('loan_required', 'loan_amount')
        }),
        ('Status Tracking', {
            'fields': ('status', 'objections')
        })
    )