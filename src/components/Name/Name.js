import React, {Component} from "react";
import "./Name.css";

class Name extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || ''
        }

        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onChangeInput(e) {
        const result = e.target.value;

        this.setState({value: result});

        this.props.updateFilter('q', result);
    }

    render() {
        return (
            <div className="name-container " >
                <input key="nameInput"
                    type="text"
                    className="name-input"
                    value={this.state.value}
                    onChange={ (e) =>{ this.onChangeInput( e); } }
                />
            </div>
        );
    }
}

export default Name;
