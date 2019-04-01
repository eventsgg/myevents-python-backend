from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Boolean, Float, func
from sqlalchemy.orm import backref, relationship
import enum

from database import Base
from datetime import datetime

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import scoped_session, sessionmaker
# engine = create_engine('sqlite:///eventsgg.sqlite3', convert_unicode=True)
# db_session = scoped_session(sessionmaker(autocommit=False,
#                                          autoflush=False,
#                                          bind=engine))
# Base = declarative_base()
# Base.query = db_session.query_property()

class Country(Base):
    __tablename__ = 'country'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(Integer)
    iso_code = Column(String(length=2))

class City(Base):
    __tablename__ = 'city'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(String)
    country_id = Column(Integer, ForeignKey('country.id'))
    country = relationship(
        Country,
        backref=backref(
            'country',
            uselist=True,
            cascade='delete,all'
        )
    )

class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    city_id = Column(Integer, ForeignKey('city.id'))
    zipcode = Column(String)
    street_name = Column(String)
    house_number = Column(String)
    comment = Column(String)
    geo_latitude = Column(String(30))
    geo_longitude = Column(String(30))
    city = relationship(
        City,
        backref=backref(
            'city',
            uselist=True,
            cascade='delete,all'
        )
    )

class EventMedia(Base):
    __tablename__ = 'event_media'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    url = Column(String)
    title = Column(String)

class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(String)
    title = Column(String)
    address_id = Column(Integer, ForeignKey('address.id'))
    main_img_media_id = Column(Integer, ForeignKey('event_media.id'))
    address = relationship(
        Address,
        backref=backref(
            'address',
            uselist=True,
            cascade='delete,all'
        )
    )
    main_img_media = relationship(
        EventMedia,
        backref=backref(
            'event_media',
            uselist=True,
            cascade='delete,all'
        )
    )

class UserMedia(Base):
    __tablename__ = 'user_media'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    url = Column(String)
    title = Column(String)

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    username = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    avatar_media_id = Column(Integer, ForeignKey('user_media.id'))
    avatar_media = relationship(
        UserMedia,
        backref=backref(
            'user_media',
            uselist=True,
            cascade='delete,all'
        )
    )

class SocialNetwork(Base):
    __tablename__ = 'social_network'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(String)

class Share(Base):
    __tablename__ = 'share'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    event_id = Column(Integer, ForeignKey('event.id'))
    user_id = Column(Integer, ForeignKey('user.id'))
    social_network_id = Column(Integer, ForeignKey('social_network.id'))
    user = relationship(
        User,
        backref=backref(
            'user',
            uselist=True,
            cascade='delete,all'
        )
    )
    event = relationship(
        Event,
        backref=backref(
            'event',
            uselist=True,
            cascade='delete,all'
        )
    )
    social_network = relationship(
        SocialNetwork,
        backref=backref(
            'social_network',
            uselist=True,
            cascade='delete,all'
        )
    )

#Base.metadata.create_all(bind=engine)