from datetime import datetime
from django.contrib.auth import get_user_model
from django.db import models

import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from django.contrib.auth import get_user_model


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class UserNode(DjangoObjectType):
    class Meta:
        model = get_user_model()
        filter_fields = []
        interfaces = (relay.Node, )


# class Query(graphene.ObjectType):
#     me = graphene.Field(UserType)
#     users = graphene.List(UserType)

#     def resolve_users(self, info):
#         return get_user_model().objects.all()

#     def resolve_me(self, info):
#         user = info.context.user
#         if user.is_anonymous:
#             raise Exception('Not logged in!')

#         return user


class Query(graphene.ObjectType):
    user = relay.Node.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        #created_at = models.DateTimeField(default=datetime.utcnow)
        username = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email, first_name, last_name):
        user = get_user_model()(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()