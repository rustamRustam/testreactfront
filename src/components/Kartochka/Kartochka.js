import React, {Component} from "react";
import "./Kartochka.css";

import Opisanie from '../Opisanie/Opisanie';

class Kartochka extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: this.props.imageUrl,
            name: this.props.name
        }
    }
    render() {
        return (
            <div className="kartochka-container">
                <img src={this.state.imageUrl} alt={this.state.name} className="kartochka-img" />
                <Opisanie {...this.props} />
            </div>
        );
    }
}

export default Kartochka;
