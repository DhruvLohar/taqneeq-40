from rest_framework import viewsets, status
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *

class JournalMixin:
    @action(detail=False, methods=['GET'])
    def getJournals(self, request, pk=None):
        journals = Journal.objects.filter(user=request.user)
        serializer = JournalSerializer(journals, many=True)
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['POST'])
    def createUpdateJournal(self, request, pk=None):
        journal_data = request.data
        journal, created = Journal.objects.update_or_create(
            id=journal_data.get('id'),
            defaults={
                'title': journal_data.get('title'),
                'content': journal_data.get('content'),
                'user': request.user
            }
        )
        serializer = JournalSerializer(journal)
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(data=serializer.data, status=status_code)
    

class RoadmapMixin:
    @action(detail=False, methods=['GET'])
    def getRoadmap(self, request, pk=None):
        current_phase = request.user.getCurrentPhase()
        
        roadmaps = current_phase.roadmap.all()
        serializer = RoadmapSerializer(roadmaps, many=True)
        
        return Response(data=serializer.data, status=status.HTTP_200_OK)