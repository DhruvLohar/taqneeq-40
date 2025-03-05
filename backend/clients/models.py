from django.db import models

class Client(models.Model):
    SOURCES_CHOICES = (
        ('Facebook', 'Facebook',),
        ('Instagram', 'Instagram',),
        ('Google', 'Google',),
        ('Referral', 'Referral',),
        ('Other', 'Other',)
    )
    
    BUDGET_CHOICES = (
        ('10L-50L', '10L-50L',),
        ('50L-1Cr', '50L-1Cr',),
        ('1Cr-5Cr', '1Cr-5Cr',),
        ('5Cr+', '5Cr+',)
    )
    
    STATUS_CHOICES = (
        ('New Lead', 'New Lead',),
        ('Follow-up', 'Follow-up',),
        ('Negotiation', 'Negotiation',),
        ('Closed', 'Closed',),
        ('Lost', 'Lost',)
    )
    
    broker = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='clients')
    
    # Basic Information
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    preferred_language = models.CharField(max_length=50)
    source = models.CharField(choices=SOURCES_CHOICES, max_length=100, blank=True, null=True)

    # Property Preferences
    property_type = models.CharField(max_length=50, blank=True, null=True)
    budget = models.CharField(choices=BUDGET_CHOICES, max_length=50, blank=True, null=True)
    preferred_locations = models.TextField(blank=True, null=True)  # Comma-separated list
    possession_timeline = models.CharField(max_length=50, blank=True, null=True)
    amenities = models.TextField(blank=True, null=True)  # Comma-separated list

    # Voice Recording & Transcription
    voice_recording = models.FileField(upload_to='voice_recordings/', blank=True, null=True)
    transcription = models.TextField(blank=True, null=True)
    key_tags = models.TextField(blank=True, null=True)  # Comma-separated tags

    # Financial Details
    loan_required = models.BooleanField(default=False)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    # Status Tracking
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='New Lead')
    objections = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name