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

class EventMedia(SQLAlchemyObjectType):
    class Meta:
        model = EventMediaModel
        interfaces = (relay. Node,)

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay. Node,)

class UserMedia(SQLAlchemyObjectType):
    class Meta:
        model = UserMediaModel
        interfaces = (relay. Node,)

class Share(SQLAlchemyObjectType):
    class Meta:
        model = ShareModel
        interfaces = (relay. Node,)

class SocialNetwork(SQLAlchemyObjectType):
    class Meta:
        model = SocialNetworkModel
        interfaces = (relay. Node,)

class Address(SQLAlchemyObjectType):
    class Meta:
        model = AddressModel
        interfaces = (relay. Node,)

class City(SQLAlchemyObjectType):
    class Meta:
        model = CityModel
        interfaces = (relay. Node,)

class Country(SQLAlchemyObjectType):
    class Meta:
        model = CountryModel
        interfaces = (relay. Node,)


# SortEnumEmployee = utils.sort_enum_for_model(EmployeeModel, 'SortEnumEmployee',
#     lambda c, d: c.upper() + ('_ASC' if d else '_DESC'))


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allow only single column sorting
    # all_employees = SQLAlchemyConnectionField(
    #     EmployeeConnection,
    #     sort=graphene.Argument(
    #         SortEnumEmployee,
    #         default_value=utils.EnumValue('id_asc', EmployeeModel.id.asc())))
    # Allows sorting over multiple columns, by default over the primary key
    all_events = SQLAlchemyConnectionField(EventConnection)


schema = graphene.Schema(query=Query, types=[Event, EventMedia, User, UserMedia, Share, SocialNetwork, Address, City, Country])
