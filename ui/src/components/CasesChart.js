import { Component } from "react";
import { Bar } from 'react-chartjs-2';

const CHART_OPTIONS = {
    tooltips: {
        displayColors: true,
        callbacks: {
            mode: 'x',
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' }
}

const arbitraryStackKey = 'LoremIpsum';

const MOCK_DATA = {
    // this should be dates array
    labels: ["7 days ago", "6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "1 day ago", "today"],
    datasets: [{
        label: 'Deaths',
        backgroundColor: "#caf270",
        data: [12, 59, 5, 56, 58, 12, 59, 87],
        stack: arbitraryStackKey,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        beginAtZero: true
    }, {
        label: 'Cases',
        backgroundColor: "#45c490",
        data: [12, 59, 5, 56, 58, 12, 59, 85],
        stack: arbitraryStackKey,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        beginAtZero: true
    }],
};

class CasesChart extends Component {

    constructor(props) {
        super(props);
        this.boundHandleChartClick = this.handleChartClick.bind(this);
        this.state = {
            options: { ...CHART_OPTIONS, onClick: this.boundHandleChartClick }
        }
    }

    handleChartClick(ev, items) {
        if (items && items.length) {
            const idx = items[0].index;
            this.props.onDatapointClick(ev.chart.data.labels[idx]);
        }
    }

    render() {
        return (
            <Bar
                data={this.props.data}
                options={this.state.options}
            />
        )
    }

}

export default CasesChart;
