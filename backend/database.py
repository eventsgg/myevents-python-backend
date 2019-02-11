# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine('sqlite:///eventsgg.sqlite3', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata. Otherwise
    # you will have to import them first before calling init_db()
    from models import Event, EventMedia, User, UserMedia, Share, SocialNetwork, Address, City, Country
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
    
    image = EventMedia(
                url='https://2.avatars.yandex.net/get-eda/1387779/c741a77ebc1a29c504fb950692c6345c/600x450',
                title = 'мак меню'
            )
    db_session.add(image)

    count = 0
    while count < 10:
        
        event = Event(title='Макдональдс', main_img_media=image)
        db_session.add(event)

        count += 1

    db_session.commit()
