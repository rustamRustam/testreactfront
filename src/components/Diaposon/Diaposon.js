import React, {Component} from "react";
import "./Diaposon.css";

class Diaposon extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            from: this.props.from || '',
            to: this.props.to || '',
            opened: false
        }

        this.clickOnDiaposonButton = this.clickOnDiaposonButton.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

    }

    clickOnDiaposonButton() {
        this.setState({
            opened: !this.state.opened
        });
    }

    onChangeInput(nameState, nameValue, e) {
        const result = e.target.value.replace(/\D/g, '');
        let _newState = {};
        _newState[nameState] = result;
        this.setState(_newState);

        this.props.updateFilter(nameValue, result);
    }

    render() {
        let _variants = null;
        let _value = '';

        if (this.state.opened) {(
            _variants = <div className="diaposon-from_to">
                <input key="diaposonFrom" type="text" className="diaposon-from" value={this.state.from}
                    onChange={ (e) =>{ this.onChangeInput("from", "created_gte", e); } }
                />
                <span>—</span>
                <input key="diaposonTo" type="text" className="diaposon-to" value={this.state.to}
                    onChange={ (e) =>{ this.onChangeInput("to", "created_lte", e); } }
                />
            </div>
        )}

        if (this.state.from !== '') {
            _value += " from "+this.state.from;
        }

        if (this.state.to !== '') {
            _value += " to "+this.state.to;
        }

        if (_value === '') {
            _value = "Created";
        }

        return (
            <div className={ "diaposon-container " + ((this.state.opened)?"opened":'') } >
                <div className="diaposon-value">
                    {_value}
                    <div className="diaposon-button" onClick={this.clickOnDiaposonButton}>▼</div>
                </div>
                {_variants}
            </div>
        );
    }
}

export default Diaposon;
