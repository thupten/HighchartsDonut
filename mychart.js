$(document).ready(function () {
    var chart;
    $(document).ready(function () {

        var colors = Highcharts.getOptions().colors,
            categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
            name = 'Browser brands',
            data = [
                {
                    y:20,
                    color:colors[0],
                    drilldown:{
                        name:'MSIE versions',
                        categories:['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0'],
                        data:[5, 5, 5, 5],
                        color:colors[0]
                    }},
                {
                    y:25,
                    color:colors[1],
                    drilldown:{
                        name:'Firefox versions',
                        categories:['Firefox 2.0', 'Firefox 3.0', 'Firefox 3.5', 'Firefox 3.6', 'FireBall'],
                        data:[5, 5, 5, 5, 5],
                        color:colors[1]
                    }},
                {
                    y:20,
                    color:colors[2],
                    drilldown:{
                        name:'Chrome versions',
                        categories:['Chrome 5.0', 'Chrome 6.0', 'Chrome 7.0', 'Chrome 8.0'],
                        data:[5, 5, 5, 5],
                        color:colors[2]
                    }},
                {
                    y:20,
                    color:colors[3],
                    drilldown:{
                        name:'Safari versions',
                        categories:['Safari 5.0', 'Safari 4.0', 'Safari Win 5.0', 'Safari 4.1'],
                        data:[5, 5, 5, 5],
                        color:colors[3]
                    }
                }
            ];


        // Build the data arrays
        var browserData = [];
        var versionsData = [];
        for (var i = 0; i < data.length; i++) {

            // add browser data
            browserData.push({
                name:categories[i],
                y:data[i].y,
                color:data[i].color
            });

            // add version data
            for (var j = 0; j < data[i].drilldown.data.length; j++) {
                var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
                versionsData.push({
                    name:data[i].drilldown.categories[j],
                    y:data[i].drilldown.data[j],
                    color:Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
        }

        //go through each BrowerData and make sure its 100. if not add the difference in Unknown.
        //then also make sure that the version Data has the Unknown too.
        var total = _(browserData).reduce(function (total, datum) {
            return total + datum.y
        }, 0);
        if (total < 100) {
            browserData.push({
                name:'UNKNOWN BROWSER',
                y:100 - total,
                color:colors[5]
            });
            versionsData.push({
                    name:'UNKNOWN VERSION',
                    y:100 - total,
                    color:colors[5]}
            );
        }

        // Create the chart
        chart = new Highcharts.Chart({
            chart:{
                renderTo:'container',
                type:'pie'
            },
            title:{
                text:'Browser market share, April, 2011'
            },
            yAxis:{
                title:{
                    text:'Total percent market share'
                }
            },
            plotOptions:{
                pie:{
                    shadow:false
                }
            },
            tooltip:{
                valueSuffix:'%'
            },
            series:[
                {
                    name:'Browsers',
                    data:browserData,
                    size:'60%',
                    dataLabels:{
                        formatter:function () {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color:'white',
                        distance:-30
                    }},
                {
                    name:'Versions',
                    data:versionsData,
                    innerSize:'60%',
                    dataLabels:{
                        formatter:function () {
                            // display only if larger than 1
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    }}
            ]
        });
    });
});
