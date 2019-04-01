# this file is needed for instantiating django app locally and connecting it to db run in container

DATABASES = {
        'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': '192.168.99.100', 
        'PORT': 5432
    }
}