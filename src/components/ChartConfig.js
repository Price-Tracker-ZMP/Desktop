module.exports = {
    getChartConfig(data) {
        const config = {
            type: 'line',
            data: data,
            options: {
                maintainAspectRatio: false,
                locale: 'pl-PL',
                scales: {
                    y: {
                        title: {
                            padding: 10
                        },
                        
                        ticks: {
                            callback: (value, index, values) => {
                            return Intl.NumberFormat(`pl-PL`, { style: `currency`, currency: `PLN`}).format(value);
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        stepped: true
                    }
                },
                plugins: {
                    decimation: {
                        enabled: false
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
            
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat(`pl-PL`, { style: `currency`, currency: `PLN`}).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    },
                },       
            } 
        };

        return config;
    }
}