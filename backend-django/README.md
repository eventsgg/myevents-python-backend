Example Flask+SQLAlchemy Project
================================

This example project demos integration between Graphene, Flask and SQLAlchemy.
The project contains two models, one named `Department` and another
named `Employee`.

Getting started
---------------

First you'll need to get the source of the project. Do this by cloning the
whole Graphene repository:

```bash
# Get the example project code
git clone https://github.com/eventsgg/myevents.git
cd myevents/backend
```

It is good idea (but not required) to create a virtual environment
for this project. We'll do this using
[virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)
to keep things simple,
but you may also find something like
[virtualenvwrapper](https://virtualenvwrapper.readthedocs.org/en/latest/)
to be useful:

```bash
# Create a virtualenv in which we can install the dependencies
virtualenv env
source env/bin/activate
```

Now we can install our dependencies:

```bash
pip install -r requirements.txt
```

Now the following command will setup the database, and start the server:

```bash
# This will start a Django server over HTTPS in order to test Facebook login
python manage.py runserver_plus --cert-file /tmp/cert

```


Now head on over to
[http://127.0.0.1:8000/graphql](http://127.0.0.1:8000/graphql)
and run some queries, for example:


```sql
# Events query all events example
query {
  events {
    id
    name
    title
  }
}
```


```sql
# Events query one event by id example
query {
  event(id: 3) {
    id
    name
    title
  }
}
```



```sql
# Event creation example
mutation {
  createEvent(
    name: "EvenMore Macdonalds",
    title: "McDss"
  ) {
    event {
      id
      name
      title
    }
  }
}
```

```sql
# User creation example
mutation {
  createUser(
    email: "hello@world.com",
    firstName: "David",
    lastName: "Semenduev",
    username: "dooy",
    password: "123qweQWE!"
  ) {
    user {
      id
      username
      lastName
    }
  }
}
```

```sql
# Event creation example from logged in user
mutation{
  createEvent(
    name: "KFC",
    title: "oh this fine crispy chicken"
  ) {
    event{
      id
      name
      createdAt
      title
      postedByUserId {
        id
        username
        email
      }
    }
  }
}
```