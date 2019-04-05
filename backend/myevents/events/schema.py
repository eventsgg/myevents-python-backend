import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import django_filters
from .models import Event, Category, Share, EventMedia
from users.schema import UserType, UserNode

from graphene import relay
#from allauth.account.decorators import login_required


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = Event
        fields = ['title', 'name']

class EventNode(DjangoObjectType):
    class Meta:
        model = Event
        interfaces = (relay.Node, )


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = [] # remake to separate filter like EventFilter
        interfaces = (relay.Node, )


class ShareNode(DjangoObjectType):
    class Meta:
        model = Share
        filter_fields = [] # remake to separate filter like EventFilter
        interfaces = (relay.Node, )


class EventMediaNode(DjangoObjectType):
    class Meta:
        model = EventMedia
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    category = relay.Node.Field(CategoryNode)
    categories = DjangoFilterConnectionField(CategoryNode)
    event = relay.Node.Field(EventNode)
    events = DjangoFilterConnectionField(EventNode, filterset_class=EventFilter)
    share = relay.Node.Field(ShareNode)
    shares = DjangoFilterConnectionField(ShareNode)


class CreateEvent(graphene.relay.ClientIDMutation):
    event = graphene.Field(EventNode)

    class Input:
        name =  graphene.String()
        title =  graphene.String()
        category = graphene.String() #graphene.Enum.from_enum(EventCategory)
        url = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user # or None
        if user.is_anonymous:
            raise Exception('Not logged in!')

        event_media = EventMedia(
            url=input.get('url')
        )
        event_media.save()

        event_category = Category.objects.filter(name=input.get('category')).first()
        if not event_category:
            raise Exception('Such Category does not exist!')

        event = Event(
            name=input.get('name'),
            title=input.get('title'),
            category=event_category,
            posted_by_user_id=user,
            main_img_media=event_media
        )
        event.save()

        return CreateEvent(event=event)


class ShareEvent(graphene.relay.ClientIDMutation):
    user = graphene.Field(UserNode)
    event = graphene.Field(EventNode)

    class Input:
        event_node_id = graphene.String()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You must be logged to share!')

        node_type, event_id = relay.Node.from_global_id(input.get('event_node_id'))
        #get_node_from_global_id(info, input.get('event_node_id'), only_type='EventNode')
        if not node_type == 'EventNode':
            raise Exception(f'Must receive a EventNode id, received {node_type} instead.')
        event = Event.objects.filter(id=event_id).first()
        if not event:
            raise Exception('Invalid Event!')

        Share.objects.create(
            user=user,
            event=event,
        )

        return ShareEvent(user=user, event=event)


class Mutation(graphene.AbstractType):
    create_event = CreateEvent.Field()
    share_event = ShareEvent.Field()
