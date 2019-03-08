MVP using Django framework
================================

Getting started
---------------

First you'll need to get the source of the project. Do this by cloning the
whole Graphene repository:

```bash
# Get the example project code
git clone https://github.com/eventsgg/myevents.git
cd myevents/backend-django
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
virtualenv venv

# This needs to be done every time you want to run server
source venv/Scripts/activate
```

Now we can install our dependencies:

```bash
pip install -r requirements.txt
```

Go to `myevents` dir:

```bash
cd myevents
```

Now we need to instantiate Django backend database (for now in SQLite):

```bash
python manage.py migrate
```

The following command will start the server:

```bash
# This will start a Django server over HTTPS in order to test Facebook login
python manage.py runserver_plus --cert-file /tmp/cert
```

This version of backend supports signing in with social networks. You can sign in at [https://localhost:8000](https://localhost:8000)

Now head on over to
[http://localhost:8000/graphql](http://localhost:8000/graphql)
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