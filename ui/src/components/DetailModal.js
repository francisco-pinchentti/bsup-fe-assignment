import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import DetailTable from './DetailTable';

class DetailModal extends Component {

    toggle() {
        this.props.onToggle();
    }

    render() {

        return (
            <Modal className="modal-lg" isOpen={this.props.isOpen} toggle={() => this.toggle()}>
                <ModalHeader
                    toggle={() => this.toggle()}>
                        Details for: {this.props.detail.date}
                </ModalHeader>
                <ModalBody>
                    <DetailTable
                        data={this.props.detail.states}
                        totals={this.props.detail.totals} />
                </ModalBody>
            </Modal>
        );
    }
}

export default DetailModal;