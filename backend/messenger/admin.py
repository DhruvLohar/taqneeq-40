from django.contrib import admin
from .models import ChatSession

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'client', 'created_at', 'modified_at')
    search_fields = ('user__name', 'client__name',)
    list_filter = ('created_at', 'modified_at')
    readonly_fields = ('created_at', 'modified_at', 'session_key',)
    
    fieldsets = (
        ('Primary Details', {
            'fields': ('user', 'client', 'is_valid', 'session_key',)
        }),
        ('Messages', {
            'classes': ('collapse',),
            'fields': ('messages',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'modified_at')
        }),
    )
    
    list_display = ('user', 'client',)
