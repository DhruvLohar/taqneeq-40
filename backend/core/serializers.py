from rest_framework import serializers
from core.models import *

class PhaseProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhaseProgress
        fields = '__all__'
        
class RoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = '__all__'
        
class KanbanBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanBoard
        fields = '__all__'
        
class KanbanColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanColumn
        fields = '__all__'
        
class KanbanTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanTask
        fields = '__all__'
        
class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'