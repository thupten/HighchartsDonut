HighchartsDonut
===============

Testing highcharts' donut pie chart
The donut chart comprise of two data inner pie and the outer pie. The pie is broken into inner pie slices and each inner pie slices are broken further down to outer pie slices. The measurements are in percent.
This test will create an extra inner and outer slice for the remaining percent. Say of 100%, if your slices totals to only 80%, then 20% is the remaining slice. 
We loop through the 'BrowserData' (as in the highcharts donut demo), calculate if it totals 100, and push an entry into the array for the remainder. And also push one for the 'versionData'
Like so,

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


