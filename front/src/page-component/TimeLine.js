import React, {Component} from 'react';

import TLMain from './TLMain';
import Footer from '../common-component/Footer';

import '../css/timeline.css';

export default class extends Component {
  render () {
    return (
        <div className="timeline_container">
            <div className="timeline">
                <TLMain />
            </div>
            <Footer />
        </div>
    );
  }
}
