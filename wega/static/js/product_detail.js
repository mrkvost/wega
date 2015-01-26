function drawChart() {
    var data = new google.visualization.arrayToDataTable(
        $COMPOSITION_DATA,
        false
    );

    var options = {
        // title: 'Composition in %',
        // title: 'none',
        width: 230,
        height: 130,
        is3D: true,
        backgroundColor: '#000',
        pieSliceText: 'label',
        pieSliceTextStyle: {
            color: 'black',
            fontSize: 12.0,
            fontName: 'Helvetica',
        },
        enableInteractivity: true,
        chartArea: {
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        legend: {
            position: 'right',
            alignment: 'center',
            textStyle: {
                color: '#E9B895',
                fontSize: 12.0,
            }
        },
        tooltip: {
            // bug; cannot add custom content into tooltip on pie chart
            // isHtml: true,
            text: 'percentage',
            textStyle: {
                fontName: 'Helvetica',
                fontSize: 12.0,
            },
        },
        colors: [
            '#6A3916', '#944F1E', '#BE6627', '#D88041', '#E19C6B', '#E9B895', '#F2D5C0',
        ],
        // colors: [
        //     '#F2D5C0', '#E9B895', '#E19C6B', '#D88041', '#BE6627', '#944F1E', '#6A3916',
        // ],
    };

    var chart = new google.visualization.PieChart(
        $('.composition-chart')[0]
    );
    chart.draw(data, options);
}

$(document).ready(function() {
    $('.btn.back').click(function(event) {
        parent.history.back();
        return false;
    });
});
