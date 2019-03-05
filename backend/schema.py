import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType, utils
from models import Event as EventModel
from models import EventMedia as EventMediaModel
from models import User as UserModel
from models import UserMedia as UserMediaModel
from models import Share as ShareModel
from models import SocialNetwork as SocialNetworkModel
from models import Address as AddressModel
from models import City as CityModel
from models import Country as CountryModel


class Event(SQLAlchemyObjectType):
    class Meta:
        model = EventModel
        interfaces = (relay. Node,)

class EventConnection(relay.Connection):
    class Meta:
        node = Event

class EventMedia(SQLAlchemyObjectType):
    class Meta:
        model = EventMediaModel
        interfaces = (relay. Node,)

class EventMediaConnection(relay.Connection):
    class Meta:
        node = EventMedia

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay. Node,)

class UserConnection(relay.Connection):
    class Meta:
        node = User

class UserMedia(SQLAlchemyObjectType):
    class Meta:
        model = UserMediaModel
        interfaces = (relay. Node,)

class UserMediaConnection(relay.Connection):
    class Meta:
        node = UserMedia

class Share(SQLAlchemyObjectType):
    class Meta:
        model = ShareModel
        interfaces = (relay. Node,)

class ShareConnection(relay.Connection):
    class Meta:
        node = Share

class SocialNetwork(SQLAlchemyObjectType):
    class Meta:
        model = SocialNetworkModel
        interfaces = (relay. Node,)

class SocialNetworkConnection(relay.Connection):
    class Meta:
        node = SocialNetwork

class Address(SQLAlchemyObjectType):
    class Meta:
        model = AddressModel
        interfaces = (relay. Node,)

class AddressConnection(relay.Connection):
    class Meta:
        node = Address

class City(SQLAlchemyObjectType):
    class Meta:
        model = CityModel
        interfaces = (relay. Node,)

class CityConnection(relay.Connection):
    class Meta:
        node = City

class Country(SQLAlchemyObjectType):
    class Meta:
        model = CountryModel
        interfaces = (relay. Node,)

class CountryConnection(relay.Connection):
    class Meta:
        node = Country


# SortEnumEmployee = utils.sort_enum_for_model(EmployeeModel, 'SortEnumEmployee',
#     lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    all_events = SQLAlchemyConnectionField(Event)
    event = relay.Node.Field(Event)


schema = graphene.Schema(query=Query, types=[Event, EventMedia, User, UserMedia, Share, SocialNetwork, Address, City, Country])
