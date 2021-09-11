import { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCasesStart, getStatesStart, getDetailStart, hideDetailModal } from '../actions/report';
import CasesChart from './CasesChart';
import FilterDropdown from './FilterDropdown';
import DetailModal from './DetailModal';

const TIME_FRAME_FILTER_OPTIONS = [
  { id: 1, description: 'Last 7 days', value: moment().subtract(7, 'd').format('YYYY-MM-DD') },
  { id: 2, description: 'Last month', value: moment().subtract(1, 'months').format('YYYY-MM-DD') },
  { id: 3, description: 'All', value: null }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      regionFilter: null,
      timeFrameFilter: TIME_FRAME_FILTER_OPTIONS[1],
    }
  }

  componentDidMount() {
    this.props.getStatesStart();
    this.props.getCasesStart({ regionFilter: 'all', timeFilter: this.state.timeFrameFilter.value });
  }

  onRegionFilterChange(o) {
    this.setState({
      regionFilter: o
    });
    const timeFilter = this.state.timeFrameFilter.value;
    this.props.getCasesStart({ regionFilter: o.id, timeFilter });
  }

  onTimeFilterChange(o) {
    this.setState({
      timeFrameFilter: o
    });
    const regionFilter = (this.state.regionFilter) ? this.state.regionFilter.id : null;
    this.props.getCasesStart({ regionFilter, timeFilter: o.value });
  }

  updateDetail(date) {
    this.props.getDetailStart({ date });
  }

  hideDetail() {
    this.props.hideDetailModal();
  }

  render() {
    return (
      <main className="p-2">

        <header className="d-flex" style={{'flexDirection': 'row'}}>

          <h1>
            COVID Historigram
          </h1>
          <form className="d-flex justify-content-evenly" style={{flexGrow: 1}}>
            <div className="d-flex align-items-center" style={{ minWidth: '200px'}}>
              <label style={{ marginRight: '0.5rem' }} htmlFor="regF">Filter by region:</label>
              <FilterDropdown
                id="regF"
                options={this.props.regionFilterOptions}
                initialValue={{ id: 'all', description: 'All' }}
                onSelect={(o) => this.onRegionFilterChange(o)}
              ></FilterDropdown>
            </div>
            <div className="d-flex align-items-center" style={{ minWidth: '200px'}}>
              <label style={{marginRight: '0.5rem'}} htmlFor="refTFF">Filter by time:</label>
              <FilterDropdown
                id="refTFF"
                options={TIME_FRAME_FILTER_OPTIONS}
                initialValue={TIME_FRAME_FILTER_OPTIONS[0]}
                onSelect={(o) => this.onTimeFilterChange(o)}
              ></FilterDropdown>
            </div>
          </form>

        </header>

        <DetailModal
          onToggle={() => this.hideDetail()}
          isOpen={this.props.showDetailDrilldown}
          detail={this.props.detail} />

        <div className="d-flex p-2" style={{ overflow: 'hidden', height: 'calc(100% - 64px)'}}>

          <section style={{flexGrow: 1}}>
            <CasesChart data={this.props.chartData} onDatapointClick={(date) => this.updateDetail(date)}></CasesChart>
          </section>
        </div>
      </main>
    );
  }

}

const mapStateToProps = ({ report }) => {
  const { regionFilterOptions, chartConfig, detail, showDetailDrilldown } = report;
  return {
    regionFilterOptions,
    chartData: chartConfig,
    detail,
    showDetailDrilldown
  }
}

export default connect(mapStateToProps, {
  getCasesStart,
  getStatesStart,
  getDetailStart,
  hideDetailModal
})(App);
