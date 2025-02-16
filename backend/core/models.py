from django.db import models
from django.contrib.auth.models import User
    

class PhaseProgress(models.Model):
    PHASE_CHOICES = [
        ('VALIDATION', 'Idea Validation & Research'),
        ('PLANNING', 'Planning and Strategy Development'),
        ('EXECUTION', 'Launch & Execution'),
        ('LEGAL', 'Legal Foundations & Finance'),
        ('GROWTH', 'Growth Marketing & Scaling')
    ]
    
    user = models.ForeignKey("users.User", related_name="phases", on_delete=models.CASCADE)
    phase = models.CharField(max_length=50, choices=PHASE_CHOICES)
    
    start_date = models.DateTimeField(null=True)
    completion_date = models.DateTimeField(null=True)
    
    current_roadmap_index = models.IntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['user', 'phase']
        
        
class Roadmap(models.Model):
    phase = models.ForeignKey("core.PhaseProgress", related_name="roadmap", on_delete=models.CASCADE)
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=255)
    
    order = models.IntegerField()
    
    class Meta:
        ordering = ['order']
        
        
class KanbanBoard(models.Model):
    phase = models.OneToOneField("core.PhaseProgress", related_name="kanban_board", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class KanbanColumn(models.Model):
    COLUMN_CHOICES = [
        ('TODO', 'To Do'),
        ('INPROGRESS', 'In Progress'),
        ('REVIEW', 'Under Review'),
        ('DONE', 'Completed')
    ]
    
    board = models.ForeignKey("core.KanbanBoard", on_delete=models.CASCADE)
    name = models.CharField(max_length=50, choices=COLUMN_CHOICES)
    
    order = models.IntegerField()
    
    class Meta:
        ordering = ['order']
        unique_together = ['board', 'name']

class KanbanTask(models.Model):
    column = models.ForeignKey("core.KanbanColumn", on_delete=models.CASCADE)
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    priority = models.CharField(max_length=20, choices=[
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High')
    ])
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
class Journal(models.Model):
    user = models.ForeignKey("users.User", related_name="journals", on_delete=models.CASCADE)
    
    content = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title