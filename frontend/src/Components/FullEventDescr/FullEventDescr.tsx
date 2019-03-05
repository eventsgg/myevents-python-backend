import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from "babel-plugin-relay/macro";
import { inject } from 'mobx-react';
import Typography from '@material-ui/core/Typography';

interface IFullEventDescrProps {
    networkEnvironment?: any;
    eventId: string;
}

const query = graphql` query FullEventDescrQuery($eventId: ID!) {
    event(id: $eventId) {
        id,
        title,
        mainImgMedia {
            title,
            url
        }
    }
}`

@inject('networkEnvironment')
class FullEventDescr extends React.PureComponent<IFullEventDescrProps> {
    render() {
        const { networkEnvironment, eventId } = this.props;

        return (
            <QueryRenderer
                environment={networkEnvironment}
                query={query}
                variables={{
                    eventId: eventId
                }}
                render={
                    ({ error, props }) => {
                        if (error) {
                            return <div>error.message</div>
                        }

                        if (!props) {
                            return 'loading';
                        }

                        const { event } = props;

                        return (
                            <>
                                <Typography variant="h3" paragraph={true}>{event.title}</Typography>
                                <Typography variant="subtitle1">
                                    Измайловская, г. Москва, 1-я ул. Измайловского Зверинца, д. 8, эт. 5
                                </Typography>
                                <div className="FullEventDescr-Main">
                                    <div className="FullEventDescr-Thumb">
                                        <img src={event.mainImgMedia.url} />
                                    </div>
                                    <div className="FullEventDescr-Info"></div>
                                </div>
                            </>
                        );
                    }
                }
            />
        );
    }
}

export { FullEventDescr };