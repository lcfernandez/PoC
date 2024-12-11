import './index.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import React, { useLayoutEffect } from 'react';

const ChartQtdAlunos = (props) => {
    const {dataChart} = props;
    
    useLayoutEffect(() => {
        // Criação do elemento raiz
        let root = am5.Root.new("chart-div");

        // Escolha do tema
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Criação do gráfico
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,
            paddingRight: 1
        }));

        // Criação do cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        // Criação dos eixos
        let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true
        });

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "_id",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: yRenderer
        }));

        // Criação das séries
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "totalQuantity",
            sequencedInterpolation: true,
            categoryXField: "_id",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        xAxis.data.setAll(props.dataChart);
        series.data.setAll(props.dataChart);

        // Animação ao carregar
        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [dataChart])

    return (
        <div className='chart-container'>
            <h1>Gráfico de quantidade de alunos</h1>
            <div className='chart-element'>
                <div id='chart-div'>
                    {!dataChart.length && <p>O gráfico ainda não contém dados.</p>}
                </div>
            </div>
        </div>
    );
}

export default ChartQtdAlunos;