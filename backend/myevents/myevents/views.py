from django.views.generic.base import TemplateView
from django.utils.safestring import mark_safe
import json


class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, *args, **kwargs):
        import allauth.socialaccount
        SOCIAL_URLS = []
        pl = allauth.socialaccount.providers.registry.get_list()
        for i in pl:
            SOCIAL_URLS.append(i.get_login_url(i.request, process='login'))

        context = super(Index, self).get_context_data(*args, **kwargs)
        context['data'] = mark_safe(json.dumps(
            {
                'social': {
                    'urls': SOCIAL_URLS
                    }
            }
        ))
        return context


## Examples taken from https://github.com/mirumee/saleor/blob/master/tests/api/test_core.py

## GraphQL Query
#     query = """
#     query {
#         products {
#             edges {
#                 node {
#                     name
#                 }
#             }
#         }
#     }
#     """
#     response = api_client.post_graphql(query)
#     content = _get_graphql_content_from_response(response)

## GraphQL Mutation
# # costPrice is snake case variable (cost_price) in the backend
#     query = """
#     mutation testCamel($id: ID!, $cost: Decimal) {
#         productVariantUpdate(id: $id,
#         input: {costPrice: $cost, trackInventory: false}) {
#             errors {
#                 field
#                 message
#             }
#             productVariant {
#                 id
#             }
#         }
#     }
#     """
#     variables = {
#         "id": graphene.Node.to_global_id("ProductVariant", variant.id),
#         "cost": 12.1234,
#     }
#     response = staff_api_client.post_graphql(
#         query, variables, permissions=[permission_manage_products]
#     )
#     content = get_graphql_content(response)