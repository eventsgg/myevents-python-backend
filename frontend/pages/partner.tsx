import { withRouter } from 'next/router';

import { Layout } from '../src/Components/Layout/Layout';

const Partner = (props) => (
    <Layout>
        {props.router.query.type}
    </Layout>
);

export default withRouter(Partner);