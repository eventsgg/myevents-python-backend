import { Environment, Network, RecordSource, Store } from 'relay-runtime';

declare global {
    interface Window { data: any; }
}

export function networkEnvironment() {
    function fetchQuery(operation, variables) {
        // Instead of making an actual HTTP request to the API, use
        // hydrated data available during the initial page load.
        let cachedData;

        if (window.data !== undefined) {
            cachedData = window.data;
            delete window.data;
        }

        if (cachedData) {
            return Promise.resolve(cachedData);
        }

        return fetch('/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: operation.text,
                variables,
            }),
            credentials: 'include',
        })
        .then(res => res.json());
    }

    const recordSource = new RecordSource();
    const store = new Store(recordSource);
    const network = Network.create(fetchQuery);

    return new Environment({ store, network });
}