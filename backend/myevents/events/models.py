from datetime import datetime
from django.db import models
from django.conf import settings
# from enum import Enum


# class Category(Enum):   # A subclass of Enum
#     RESTAURANTS_AND_CAFES = "Рестораны и Кафе"
#     ENTERTAINMENT = "Развлечения"
#     CONCERTS = "Концерты"
#     BEAUTY = "Красота"
#     OTHER = "Разное"


class Category(models.Model):
    name = models.CharField(max_length=100)
    name_ru = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# INSERT INTO public.events_eventcategory(
# 	id, name, name_ru)
# 	VALUES (0, 'Other', 'Разное'),
# 	(1, 'Restaurants and Cafes', 'Рестораны и Кафе'),
# 	(2, 'Entertainment', 'Развлечения'),
# 	(3, 'Concerts', 'Концерты'),
# 	(4, 'Beauty', 'Красота')
# 	;


class EventMedia(models.Model):
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(blank=True, null=True)
    url = models.CharField(max_length=250)


class Event(models.Model):
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(blank=True, null=True)
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=150)

    ## Enum implementation attempts. Dropped off for now

    # category = models.CharField(
    #     max_length=25,
    #     #choices=EVENT_CATEGORIES,
    #     #default="OTHER",
    #     choices=[(tag.name, tag.value) for tag in EventCategory],
    #     default=EventCategory.OTHER.name
    # )
    # category = models.Field(EventCategory, default=EventCategory.OTHER)

    ## Categories defined in a table

    category = models.ForeignKey(Category, related_name='events', on_delete=models.CASCADE) 

    # TODO: fields with relations
    #address_id = Column(Integer, ForeignKey('address.id'))
    main_img_media = models.ForeignKey('events.EventMedia', null=True, related_name='events', on_delete=models.CASCADE)
    posted_by_user_id = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)


class Share(models.Model):
    created_at = models.DateTimeField(default=datetime.utcnow)
    updated_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey('events.Event', related_name='shares', on_delete=models.CASCADE)