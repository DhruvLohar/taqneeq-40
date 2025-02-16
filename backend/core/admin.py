from django.contrib import admin
from .models import *

@admin.register(PhaseProgress)
class PhaseProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'phase', 'start_date', 'completion_date', 'is_completed')
    list_filter = ('phase', 'is_completed')
    search_fields = ('user__name', 'phase')
    
@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
    list_display = ('phase', 'title', 'description', 'duration', 'order')
    list_filter = ('phase',)
    search_fields = ('title', 'description')
    
@admin.register(KanbanBoard)
class KanbanBoardAdmin(admin.ModelAdmin):
    list_display = ('phase', 'name')
    search_fields = ('name',)
    
@admin.register(KanbanColumn)
class KanbanColumnAdmin(admin.ModelAdmin):
    list_display = ('board', 'name')
    search_fields = ('name',)
    
@admin.register(KanbanTask)
class KanbanTaskAdmin(admin.ModelAdmin):
    list_display = ('column', 'title', 'description', 'priority')
    list_filter = ('priority',)
    search_fields = ('title', 'description')
    
@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ('user', 'content',)
    search_fields = ('content',)