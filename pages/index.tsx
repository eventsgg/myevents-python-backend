import { withRouter } from 'next/router';

import { Layout } from '../src/Components/Layout/Layout';
import { EventCardTileList } from '../src/Components/EventCardTileList/EventCardTileList';

const Index = (props) => (
    <Layout>
        <EventCardTileList category={props.router.query.category} />
    </Layout>
);

export default withRouter(Index);