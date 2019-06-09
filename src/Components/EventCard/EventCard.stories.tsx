import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventCard } from './EventCard';

var data = {
    image: {
        src: 'https://2.avatars.yandex.net/get-eda/1387779/c741a77ebc1a29c504fb950692c6345c/600x450',
        title: 'мак меню'
    },
    title: 'Макдональднс'
} 

storiesOf('EventCard', module)
    .add('basic', () => <EventCard shareModalStore={{ open: false }} image={data.image} title={data.title} />);