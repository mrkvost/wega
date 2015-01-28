function roundTo2(value) {
    return Math.round(value * 100 + 0.5) / 100;
}

function generate_row(index, coefficient, growth) {
    var value = Math.log((index * coefficient) * (1 + Math.random() * 0.8));
    return [index, roundTo2(growth*value)];
}

function generate_data(header, amount, coefficient, growth) {
    var data = new Array(); // [header];
    data.push(header);

    var c2;
    var accident;
    for (var i=1; i <= amount; i++) {
        if (i % 30 == 0) {
            c2 = coefficient * (0.98 + Math.random() + i * Math.random());
        }
        if (i % 7 == 0 && Math.random() > 0.7) {
            accident = 5*roundTo2(Math.random()*10);
        }
        if (accident > 1) {
            c2 = c2*(1 - 1/accident);
        }
        data.push(generate_row(i, c2, Math.log(i*10)*growth));
        if (accident > 1) {
            accident--;
        }
    }
    // console.log(data);
    return data;
}

function drawChart() {
    var data = google.visualization.arrayToDataTable(
        generate_data(['Day', 'Income'], 365, 140, 1.13),
        false
    );

    var options = {
        backgroundColor: '#000',
        width: 700,
        height: 400,
        legend: 'none',
        curveType: 'function',
        colors: ['#E9B895'],
        chartArea: {
            left: 25,
            width: '100%',
            height: '80%',
        },
        hAxis: {
            title: 'Day of the year',
            titleTextStyle: {
                color: '#D87F40',
            },
            textPosition: 'out',
            textStyle: {
                color: '#D87F40',
            },
        },
        vAxis: {
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
    };

    var chart = new google.visualization.LineChart(
        $('.income-chart')[0]
    );

    chart.draw(data, options);
}
