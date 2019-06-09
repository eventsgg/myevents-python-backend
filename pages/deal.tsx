import { withRouter } from 'next/router';

import { Layout } from '../src/Components/Layout/Layout';
import { FullEventDescr } from '../src/Components/FullEventDescr/FullEventDescr';

const Deal = (props) => (
    <Layout>
        <FullEventDescr eventId={props.router.query.id} />
    </Layout>
);

export default withRouter(Deal);