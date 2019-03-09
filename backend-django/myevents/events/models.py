from datetime import datetime
from django.db import models
from django.conf import settings
from enum import Enum


class EventCategory(Enum):   # A subclass of Enum
    RESTAURANTS_AND_CAFES = "Рестораны и Кафе"
    ENTERTAINMENT = "Развлечения"
    CONCERTS = "Концерты"
    BEAUTY = "Красота"
    OTHER = "Разное"


class Event(models.Model):
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=150)
    category = models.CharField(
        max_length=25,
        choices=[(tag, tag.value) for tag in EventCategory],
        default=EventCategory.OTHER.value
    )
    # TODO: fields with relations
    #address_id = Column(Integer, ForeignKey('address.id'))
    #main_img_media_id = Column(Integer, ForeignKey('event_media.id'))
    posted_by_user_id = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)


class Share(models.Model):
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey('events.Event', related_name='shares', on_delete=models.CASCADE)