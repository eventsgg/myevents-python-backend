MVP using Django framework
================================

Getting started
---------------

Local deployment Docker
-----------------------

We need to build Docker image locally first. Then run some initial setup:

```bash
# Build docker image
docker build .

# Make initial migrations
docker-compose run web python ./myevents/manage.py makemigrations --noinput
docker-compose run web python ./myevents/manage.py migrate --noinput

# Create superuser for Django admin
docker-compose run web python ./myevents/manage.py createsuperuser
```

Now you can launch app from image and detach from container:

```bash
docker-compose up -d --build
```

In case you need to debug something in docker container, you can always get inside and look around:

```bash
docker-compose exec web bash
```

Remote deployment Docker (Digital Ocean)
----------------------------------------

Dumps GraphQL schema in JSON format

#TODO put in Dockerfile (?)

```bash
python manage.py graphql_schema
```

```bash
# get local env
eval $(docker-machine env default)

# create image locally
docker-compose -f docker-compose-production.yml build

# save image
docker save -o img.tar eventsgg_django

# load image to DO machine
scp img.tar root@157.230.127.115:/root

# stop running containers
docker-compose -f docker-compose-production.yml down

# ssh to DO machine and load image to docker
ssh root@157.230.127.115
docker load -i img.tar

# fire up remote image from your local machine
eval $(docker-machine env development)
docker-compose -f docker-compose-production.yml up -d
```

SKIP INSTRUCTIONS BELOW
===================================================================================

#TODO add instructions on how to connect a dedicated docker machine on DigitalOcean

```bash
eval $(docker-machine env development)

docker-compose --verbose -f docker-compose-production.yml up -d --build
```

Local deployment (without docker)
---------------------------------

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


Query examples
--------------

```sql
# Events query all events example
query {
  events {
    edges {
      node {
        id
        name
        title
        category {
          name
        }
        postedByUserId {
          username
          lastLogin
        }
        mainImgMedia {
          url
        }
      }
    }
  }
}
```


```sql
# Events query one event by id example
query {
  event(id: "RXZlbnROb2RlOjM5") {
    id
    name
    title
  }
}
```

```sql
# Getting Event Category names
query {
  categories {
    edges {
      node {
        id
        name
        nameRu
      }
    }
  }
}
```

```sql
# Getting all categories and corresponding Events in those categories
query {
  categories {
    edges {
      node {
        id
        name
        nameRu
        events {
          edges {
            node {
              name
              title
              mainImgMedia {
                url
              }
            }
          }
        }
      }
    }
  }
}
```

```sql
# Event creation example
mutation {
  createEvent(
    name: "Macdonalds"
    title: "McDss"
    category: "Restaurants and Cafes"
    url: "https://cdn-images-1.medium.com/max/1600/1*hPUbZhycGqRKCQAjlhRN7w.jpeg"
  ) {
    event {
      id
      name
      title
      postedByUserId {
        username
      }
      mainImgMedia {
        url
      }
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
mutation {
  createEvent(input: {
    name: "KFC",
    title: "Some nice KFC",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTi4UH7FsdDVcjtFYlJYUCRiqna50txDDjqmz7vX-NzlhUqx2M",
    category: "Restaurants and Cafes"
  }) {
    event {
      id
			name
      title
      category {
        name
        nameRu
      }
      mainImgMedia {
        url
      }
    }
  }
}
```

```sql
# Write share to the database
mutation {
	shareEvent (input: {
    eventNodeId: "RXZlbnROb2RlOjM5"
  }) {
    user {
      username
    }
    event {
      id
      title
      name
      postedByUserId {
        username
      }
    }
  }
}
```

```sql
# Query all shares with event and user voted details
query {
  shares {
    edges {
      node {
        id
        createdAt
        event {
          id
          title
        }
        user {
          username
        }
      }
    }
  }
}
```