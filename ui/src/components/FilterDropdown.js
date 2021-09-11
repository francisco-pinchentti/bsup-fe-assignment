import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class FilterDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedValue: null
        };
    }

    onToggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    onOptionSelect(o) {
        this.setState({ selectedValue: o });
        this.props.onSelect(o);
    }

    getLabel() {
        if (this.state.selectedValue) {
            return this.state.selectedValue.description;
        } else {
            return (this.props.initialValue) ? this.props.initialValue.description : '';
        }
    }

    render() {
        return (
            <Dropdown isOpen={this.state.isOpen} toggle={() => this.onToggle()}>
                <DropdownToggle>
                    {this.getLabel()}
                </DropdownToggle>
                <DropdownMenu>
                    {this.props.options.map(o => <DropdownItem key={'option-' + o.id} onClick={() =>this.onOptionSelect(o)}>{o.description}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
        );
    }

}

export default FilterDropdown;
