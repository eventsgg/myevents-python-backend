import graphene

import events.schema


class Query(events.schema.Query, graphene.ObjectType):
    pass
class Mutation(events.schema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
