import React, { Component } from 'react';
import { Table } from 'reactstrap';

class DetailTable extends Component {

    render() {
        return (
            <Table style={{ minHeight: '500px' }}>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Cases</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map( d => <tr key={'dtr-'+d.state}>
                        <td>{d.state}</td>
                        <td>{d.cases}</td>
                        <td>{d.deaths}</td>
                    </tr>)}
                    <tr>
                        <td>US Totals:</td>
                        <td>{this.props.totals.cases}</td>
                        <td>{this.props.totals.deaths}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

}

export default DetailTable;
