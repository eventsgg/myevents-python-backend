import { Layout } from '../src/Components/Layout/Layout';

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {
        return (
            <Layout>
                <div style={{ color: 'red' }}>
                    {this.props.statusCode
                        ? `An error ${this.props.statusCode} occurred on server`
                        : 'An error occurred on client'}
                </div>
            </Layout>
        );
    }
}

export default Error;