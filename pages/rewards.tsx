import { withRouter } from 'next/router';

import { Layout } from '../src/Components/Layout/Layout';
import { RewardsList } from '../src/Components/RewardsList/RewardsList';

const Rewards = (props) => (
    <Layout>
        <RewardsList />
    </Layout>
);

export default withRouter(Rewards);