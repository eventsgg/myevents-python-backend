import React from 'react';
import { storiesOf } from '@storybook/react';
import EventCard from './EventCard';

storiesOf('EventCard', module)
    .add('basic', () => <EventCard/>);