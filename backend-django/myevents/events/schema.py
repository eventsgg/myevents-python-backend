import graphene
from graphene_django import DjangoObjectType
from .models import Event, Share, EventCategory
from users.schema import UserType

from graphene import relay
#from allauth.account.decorators import login_required


class EventType(DjangoObjectType):
    class Meta:
        model = Event


class ShareType(DjangoObjectType):
    class Meta:
        model = Share


class Query(graphene.ObjectType):
    event = graphene.Field(
                EventType,
                id=graphene.Int(),
                name=graphene.String()
                )
    events = graphene.List(EventType)
    shares = graphene.List(ShareType)

    def resolve_events(self, info, **kwargs):
        return Event.objects.all()
    
    def resolve_event(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Event.objects.get(pk=id)

        if name is not None:
            return Event.objects.get(name=name)

        return None

    def resolve_shares(self, info, **kwargs):
        return Share.objects.all()


class CreateEvent(graphene.Mutation):
    event = graphene.Field(EventType)

    class Arguments:
        name =  graphene.String()
        title =  graphene.String()
        category = graphene.String()

    def mutate(self, info, name, title, category):
        user = info.context.user # or None
        if user.is_anonymous:
            raise Exception('Not logged in!')

        event = Event(
            name=name,
            title=title,
            category=category,
            posted_by_user_id=user
        )
        event.save()

        return CreateEvent(event=event)


class ShareEvent(graphene.Mutation):
    user = graphene.Field(UserType)
    event = graphene.Field(EventType)

    class Arguments:
        event_id = graphene.Int()

    def mutate(self, info, event_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You must be logged to share!')

        event = Event.objects.filter(id=event_id).first()
        if not event:
            raise Exception('Invalid Event!')

        Share.objects.create(
            user=user,
            event=event,
        )

        return ShareEvent(user=user, event=event)


class Mutation(graphene.ObjectType):
    create_event = CreateEvent.Field()
    share_event = ShareEvent.Field()

'''
class Event(SQLAlchemyObjectType):
    class Meta:
        model = EventModel
        interfaces = (relay.Node , )

class EventConnection(relay.Connection):
    class Meta:
        node = Event

class EventMedia(SQLAlchemyObjectType):
    class Meta:
        model = EventMediaModel
        interfaces = (relay.Node , )

class EventMediaConnection(relay.Connection):
    class Meta:
        node = EventMedia

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node ,)

class UserConnection(relay.Connection):
    class Meta:
        node = User

class UserMedia(SQLAlchemyObjectType):
    class Meta:
        model = UserMediaModel
        interfaces = (relay.Node ,)

class UserMediaConnection(relay.Connection):
    class Meta:
        node = UserMedia

class Share(SQLAlchemyObjectType):
    class Meta:
        model = ShareModel
        interfaces = (relay.Node ,)

class ShareConnection(relay.Connection):
    class Meta:
        node = Share

class SocialNetwork(SQLAlchemyObjectType):
    class Meta:
        model = SocialNetworkModel
        interfaces = (relay.Node ,)

class SocialNetworkConnection(relay.Connection):
    class Meta:
        node = SocialNetwork

class Address(SQLAlchemyObjectType):
    class Meta:
        model = AddressModel
        interfaces = (relay.Node ,)

class AddressConnection(relay.Connection):
    class Meta:
        node = Address

class City(SQLAlchemyObjectType):
    class Meta:
        model = CityModel
        interfaces = (relay.Node ,)

class CityConnection(relay.Connection):
    class Meta:
        node = City

class Country(SQLAlchemyObjectType):
    class Meta:
        model = CountryModel
        interfaces = (relay.Node ,)

class CountryConnection(relay.Connection):
    class Meta:
        node = Country


# SortEnumEmployee = utils.sort_enum_for_model(EmployeeModel, 'SortEnumEmployee',
#     lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    event = relay.Node.Field(Event)
    #events = SQLAlchemyConnectionField(Event)
    #events = graphene.List(Event)

    # def resolve_events(self, info, **kwargs):
    #     query = User.get_query(info)
    #     return query.all()

    # def resolve_event(self, info):
    #     query = User.get_query(info)
    #     return query.all()
    # # Allow only single column sorting
    # # all_employees = SQLAlchemyConnectionField(
    # #     EmployeeConnection,
    # #     sort=graphene.Argument(
    # #         SortEnumEmployee,
    # #         default_value=utils.EnumValue('id_asc', EmployeeModel.id.asc())))
    # # Allows sorting over multiple columns, by default over the primary key
    events = SQLAlchemyConnectionField(Event)


class CreateEvent(graphene.Mutation):
    class Input:
        name =  graphene.String()
        title =  graphene.String()
        address_id = graphene.Int()
        main_img_media_id =  graphene.Int()
        posted_by_user_id = graphene.Int()

    event = graphene.Field(lambda: Event)
    ok = graphene.Boolean()

    @classmethod
    def mutate(self, info, **kwargs):
        #user = info.context.user or None

        event = Event(
            # name = args.get('name'),
            # title = args.get('title'),
            # address_id = args.get('address_id'),
            # main_img_media_id = args.get('main_img_media_id'),
            name = name,
            title = title,
            address_id = address_id,
            main_img_media_id = main_img_media_id,
            #posted_by = graphene.Field(Users),
        )
        db_session.add(event)
        db_session.commit()
        ok = True

        return CreateEvent(event=event, ok=ok)


class Mutation(graphene.ObjectType):
    create_event = CreateEvent.Field()


schema = graphene.Schema(query=Query, mutation=Mutation, types=[Event, EventMedia, User, UserMedia, Share, SocialNetwork, Address, City, Country])
'''