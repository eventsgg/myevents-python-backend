#!/usr/bin/env python

from flask import Flask

from database import db_session, init_db
from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)
app.debug = True

app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True, context={'session': db_session}))


# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     db_session.remove()

if __name__ == '__main__':
    init_db()
    app.run()
