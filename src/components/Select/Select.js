import React, {Component} from "react";
import "./Select.css";

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            current: this.props.current || 0,
            nameValue: this.props.nameValue,
            opened: false
        }

        this.clickOnSelectButton = this.clickOnSelectButton.bind(this);
        this.clickOnSelectVariant = this.clickOnSelectVariant.bind(this);
    }

    clickOnSelectButton() {
        this.setState({
            opened: !this.state.opened
        });
    }

    clickOnSelectVariant(_current) {
        this.props.updateFilter(this.props.nameFilter, _current);
        this.setState({
            current: _current,
            opened: false
        });
    }

    render() {
        let _nameValue = this.props.nameValue;
        let _variants = null;

        if (this.state.opened) {(
            _variants = <div className="select-variants">
            {
                this.props.values.map((_data,_index)=>{
                    return <div key={"id"+_nameValue+_data.id}
                            className={"select-variant text_dots "+((_data.id === this.state.current)?"current":'') }
                            onClick={(e) =>  this.clickOnSelectVariant(_data.id, e) }
                        >{_data[_nameValue]}</div>
                })
            }
            </div>
        )}

        return (
            <div className={"select-container " + ((this.state.opened)?"opened":'') } >
                <div className="select-value text_dots">
                    {this.props.values.find(item => item.id === this.state.current)[_nameValue]}
                    <div className="select-button" onClick={this.clickOnSelectButton}>▼</div>
                </div>
                {_variants}

            </div>
        );
    }
}

export default Select;
