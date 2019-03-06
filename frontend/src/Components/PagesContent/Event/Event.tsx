import React from 'react';

import { FullEventDescr } from '../../FullEventDescr/FullEventDescr';

function EventPageContent(props) {
    const { match } = props;

    return (
        <FullEventDescr eventId={match.params.id} />
    );
}

export { EventPageContent };