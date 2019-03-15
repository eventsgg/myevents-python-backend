import React from 'react'

import { EventCardTileList } from '../../EventCardTileList/EventCardTileList';

function IndexPageContent(props) {
    const { match } = props;

    return (
      <EventCardTileList category={match.params.id} />
    );
}

export { IndexPageContent };