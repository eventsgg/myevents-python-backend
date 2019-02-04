import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventCardTileList } from './EventCardTileList';

storiesOf('EventCardTileList', module)
    .add('basic', () => <EventCardTileList/>);
