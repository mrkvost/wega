function drawChart() {
    var coefficient = 137;
    var data = google.visualization.arrayToDataTable([
        ['Size', 'Sold', { role: "style" }],
        ['XXS', 33 * coefficient, '#944F1E'],
        ['XS', 66 * coefficient, '#D88041'],
        ['S', 152 * coefficient, '#E9B895'],
        ['M', 220 * coefficient, '#F2D5C0'],
        ['XL', 126 * coefficient, '#E19C6B'],
        ['XXL', 48 * coefficient, '#BE6627'],
        ['XXXL', 12 * coefficient, '#6A3916'],
    ], false);

    var options = {
        backgroundColor: '#000',
        width: 700,
        height: 400,
        legend: 'none',
        chartArea: {
            left: 25,
            width: '100%',
            height: '80%',
        },
        hAxis: {
            title: 'Size',
            titleTextStyle: {
                color: '#D87F40',
            },
            textPosition: 'out',
            textStyle: {
                color: '#D87F40',
            },
        },
        vAxis: {
            // title: 'Sold',
            // titleTextStyle: {
            //     color: '#D87F40',
            // },
            title: null,
            baselineColor: '#D87F40',
            textPosition: 'in',
            textStyle: {
                color: '#D87F40',
            },
            gridlines: {
                color: '#944F1E',
                count: 8,
            },
        },
        trendlines: {
            0: {type: 'linear', lineWidth: 5, opacity: .5},
            // 1: {type: 'exponential', lineWidth: 10, opacity: .3}
        },
    };

    var chart = new google.visualization.ColumnChart(
        $('.sizes-chart')[0]
    );

    chart.draw(data, options);
}
