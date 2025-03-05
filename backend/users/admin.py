from django.contrib import admin
from users.models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'created_at', 'modified_at', 'last_login', 'is_active')
    
    exclude = ('password',)

@admin.register(UserOnboarding)
class UserOnboardingAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('user', 'bio')
        }),
        ('Work Experience', {
            'fields': ('professional_summary', 'past_roles', 'skills', 'industry_experience')
        }),
        ('Business Plans', {
            'fields': ('business_idea', 'market_opportunity', 'business_type', 'target_market', 'technical_proficiency')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
