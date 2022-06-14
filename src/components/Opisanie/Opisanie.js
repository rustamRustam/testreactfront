import React, {Component} from "react";
import "./Opisanie.css";

class Opisanie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            autor: this.props.autor,
            created: this.props.created,
            location: this.props.location
        }
    }
    render() {
        return (
            <div className="opisanie-container">
                <div className="opisanie-name text_dots">{this.state.name}</div>
                <div className="opisanie-data">
                    <div className="opisanie-title-info">
                        <div>Autor:</div>
                        <div className="left-space text_dots">{this.state.autor}</div>
                    </div>

                    <div className="opisanie-title-info">
                        <div>Create:</div>
                        <div className="left-space text_dots">{this.state.created}</div>
                    </div>

                    <div className="opisanie-title-info">
                        <div>Location:</div>
                        <div className="left-space text_dots">{this.state.location}</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Opisanie;
