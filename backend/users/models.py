from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from rest_framework_simplejwt.tokens import AccessToken, TokenError

from core.models import PhaseProgress
from .constants import *


class User(AbstractBaseUser, models.Model):
    profile_image = models.ImageField(upload_to="profiles/", null=True, blank=True)
    
    name = models.CharField(max_length=120, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(blank=True, null=True)
    
    is_active = models.BooleanField(
        default=True,
        help_text="Designates whether this user should be treated as active."
    )
    
    PHASE_CHOICES = [
        ('VALIDATION', 'Idea Validation & Research'),
        ('PLANNING', 'Planning and Strategy Development'),
        ('EXECUTION', 'Launch & Execution'),
        ('LEGAL', 'Legal Foundations & Finance'),
        ('GROWTH', 'Growth Marketing & Scaling')
    ]
    current_phase = models.CharField(choices=PHASE_CHOICES, max_length=50, default='VALIDATION')
    
    access_token = models.TextField(null=True, blank=True)
    valid_otp = models.PositiveIntegerField(null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def generateToken(self):
        new_token = AccessToken.for_user(self)
        self.access_token = str(new_token)
        self.save()
        
    def getCurrentPhase(self) -> PhaseProgress:
        progress = PhaseProgress.objects.get(user=self, phase=self.current_phase)
        return progress

    def __str__(self):
        return str(self.name)


class UserOnboarding(models.Model):
    
    # Stage 1: Personal Information
    user = models.OneToOneField("users.User", on_delete=models.CASCADE)
    bio = models.TextField(help_text="Tell us about yourself, interests, and business motivations")
    
    # Stage 2: Work Experience
    professional_summary = models.TextField(help_text="Current role and responsibilities")
    past_roles = models.TextField(help_text="Previous work experience and achievements")
    skills = models.TextField(help_text="Relevant skills and expertise")
    industry_experience = models.TextField(help_text="Relevant industry experience and projects")
    
    # Stage 3: Business Plans
    business_idea = models.TextField(help_text="Description of business idea and problem solved")
    market_opportunity = models.TextField(help_text="Target audience and value proposition")
    
    business_type = models.CharField(
        max_length=20,
        choices=BUSINESS_TYPE_CHOICES,
        help_text="Primary industry sector of your business"
    )
    target_market = models.CharField(
        max_length=20,
        choices=TARGET_MARKET_CHOICES,
        help_text="Primary target market segment"
    )
    technical_proficiency = models.CharField(
        max_length=20,
        choices=TECHNICAL_PROFICIENCY_CHOICES,
        help_text="Technical skill level"
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Onboarding for {self.user.name}"
    
    class Meta:
        verbose_name = "User Onboarding"
        verbose_name_plural = "User Onboardings"