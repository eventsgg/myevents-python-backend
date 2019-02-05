from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Boolean, Float, func
from sqlalchemy.orm import backref, relationship
import enum

from database import Base
from datetime import datetime


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(String)

class EventMedia(Base):
    __tablename__ = 'event_media'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    event_id = Column(Integer, ForeignKey('event.id'))
    url = Column(String)
    title = Column(String)
    event = relationship(
        Event,
        backref=(
            'event',
            uselist=True,
            cascade='delete,all'
        )
    )

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    username = Column(String)
    first_name = Column(String)
    last_name = Column(String)

class UserMedia(Base):
    __tablename__ = 'user_media'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    user_id = Column(Integer, ForeignKey('user.id'))
    url = Column(String)
    title = Column(String)
    user = relationship(
        User,
        backref=(
            'user',
            uselist=True,
            cascade='delete,all'
        )
    )

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
        backref=(
            'user',
            uselist=True,
            cascade='delete,all'
        )
    )
    event = relationship(
        Event,
        backref=(
            'event',
            uselist=True,
            cascade='delete,all'
        )
    )
    social_network = relationship(
        SocialNetwork,
        backref=(
            'social_network',
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
    geo_latitude = Column(postgresql.String(30))
    geo_longitude = Column(postgresql.String(30))
    city = relationship(
        City,
        backref=(
            'city',
            uselist=True,
            cascade='delete,all'
        )
    )

class City(Base):
    __tablename__ = 'city'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(String)
    country_id = Column(Integer, ForeignKey('country.id'))
    country = relationship(
        Country,
        backref=(
            'country',
            uselist=True,
            cascade='delete,all'
        )
    )

class Country(Base):
    __tablename__ = 'country'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True))
    name = Column(Integer)
    iso_code = Column(String(length=2))
