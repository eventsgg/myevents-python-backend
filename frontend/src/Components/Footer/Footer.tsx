import React, { Component } from 'react';
import './Footer.scss';

interface IFooter {
    mix?: string;
}

class Footer extends Component<IFooter> {
    render() {
        const { mix } = this.props;
        return (<div className={`footer ${mix}`}></div>)
    }
}

export { Footer };