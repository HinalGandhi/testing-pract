import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { useLayoutEffect } from "react";

const Chart = () => {
  useLayoutEffect(() => {
    // Create chart
   
var chart = am4core.create("chartdiv1", am4charts.XYChart);
chart.paddingRight = 20;
var dateAxis = chart.xAxes.push(new am4charts.ValueAxis());
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.grid.template.location = 0.5;
dateAxis.startLocation = 0.5;
dateAxis.endLocation = 0.5;
const obj = {
  '1.0': "Vessel First",
  '2.0': "Vessel Second"
}
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.adapter.add("text", function (text) {
  return obj[text];
});
function createSeries(name, data) {
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueX = "value";
  series1.dataFields.valueY = "date";
  series1.strokeWidth = 3;
  series1.tensionX = 0.8;
  series1.bullets.push(new am4charts.CircleBullet());
  series1.data = data
  series1.name = name
}
createSeries('1', [{
  "date": '1',
  "value": 63
}, {
  "date": '1',
  "value": 80
}, {
  "date": '1',
  "value": 75
}, {
  "date": '1',
  "value": 90
}]);
createSeries('2',[{
  "date": '2',
  "value": 50
}, {
  "date": '2',
  "value": 60
}, {
  "date": '2',
  "value": 70
}, {
  "date": '2',
  "value": 80
}, {
  "date": '2',
  "value": 100
}]);

    return () => {
      chart.dispose();
    };
  }, []);

  return (<div id="chartdiv1"></div>);
};

export default Chart;