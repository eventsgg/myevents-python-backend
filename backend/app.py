#!/usr/bin/env python

from flask import Flask

from database import db_session, init_db
from flask_graphql import GraphQLView
from schema import schema
from graphql.utils import schema_printer

app = Flask(__name__)
app.debug = True

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, context={'session': db_session}))

my_schema_str = schema_printer.print_schema(schema)
fp = open("schema.graphql", "w")
fp.write(my_schema_str)
fp.close()


# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     db_session.remove()

if __name__ == '__main__':
    init_db()
    app.run()
