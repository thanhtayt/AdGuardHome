import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import map from 'lodash/map';

import Card from '../ui/Card';
import Cell from '../ui/Cell';

import { getPercent } from '../../helpers/helpers';
import { STATUS_COLORS } from '../../helpers/constants';

class QueriedDomains extends Component {
    getPercentColor = (percent) => {
        if (percent > 10) {
            return STATUS_COLORS.red;
        } else if (percent > 5) {
            return STATUS_COLORS.yellow;
        }
        return STATUS_COLORS.green;
    }

    columns = [{
        Header: 'IP',
        accessor: 'ip',
        Cell: ({ value }) => (<div className="logs__row logs__row--overflow"><span className="logs__text" title={value}>{value}</span></div>),
    }, {
        Header: 'Requests count',
        accessor: 'count',
        Cell: ({ value }) => {
            const percent = getPercent(this.props.dnsQueries, value);
            const percentColor = this.getPercentColor(percent);

            return (
                <Cell value={value} percent={percent} color={percentColor} />
            );
        },
    }];

    render() {
        return (
            <Card title="Top queried domains" subtitle="for the last 24 hours" bodyType="card-table" refresh={this.props.refreshButton}>
                <ReactTable
                    data={map(this.props.topQueriedDomains, (value, prop) => (
                        { ip: prop, count: value }
                    ))}
                    columns={this.columns}
                    showPagination={false}
                    noDataText="No domains found"
                    minRows={6}
                    className="-striped -highlight card-table-overflow"
                />
            </Card>
        );
    }
}

QueriedDomains.propTypes = {
    topQueriedDomains: PropTypes.object.isRequired,
    dnsQueries: PropTypes.number.isRequired,
    refreshButton: PropTypes.node.isRequired,
};

export default QueriedDomains;
