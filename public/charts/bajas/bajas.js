function chart_annos(annos, data, tipo) {

    let series = [];
    for (let i = 0; i < data.length; i++) {
        series.push({
            name: data[i].name,
            type: 'bar',
            data: data[i].value,
            markPoint: {
                data: [
                    {type: 'max', name: 'Valor Máximo'},
                    {type: 'min', name: 'Valor Mínimo'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: 'Valor Promedio'}
                ]
            }
        },)
    }

    var myChart1 = echarts.init(document.getElementById('all-years'), 'roma');
    // specify chart configuration item and data

    var option = {

        tooltip: {},
        legend: {
            data: annos
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false,title:"Vista de Datos",lang:['Vista de Datos', 'Cerrar', 'Recargar']},
                magicType: {show: true,title:"Tipo", type: ['line', 'bar','stack']},
                restore: {show: true,title:"Recargar"},
                saveAsImage: {show: true,title:"Captura"},

            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Bajas (Unidad)',
            }
        ],
        series: series
    };
    // use configuration item and data specified to show chart
    myChart1.setOption(option);
};

function chart_mes(lengend, select, data, fecha) {
    var myChart2 = echarts.init(document.getElementById('all-months'), 'roma');

    option = {

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} Unidad/es ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            //array de nombres
            data: lengend,//["Compras","Recarga","Pagos","Almuerzo","Impuesto","Montador","Guagua","Viaje","Custodio","Merienda"],
            //object {"":true or false}
            selected: select,//{Compras:true,"Recarga":true,"Pagos":true,"Almuerzo":true,"Impuesto":true,"Montador":true,"Guagua":true,"Viaje":true,"Custodio":true,"Merienda":true},
        },
        series: [
            {
                name: fecha,
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                //objet {name:"casa",value:8888}
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option);
}
function chart_motivo_mes(lengend, select, data, fecha) {
    var myChart2 = echarts.init(document.getElementById('all-motivs'), 'roma');

    option = {

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} Unidad/es ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            //array de nombres
            data: lengend,//["Compras","Recarga","Pagos","Almuerzo","Impuesto","Montador","Guagua","Viaje","Custodio","Merienda"],
            //object {"":true or false}
            selected: select,//{Compras:true,"Recarga":true,"Pagos":true,"Almuerzo":true,"Impuesto":true,"Montador":true,"Guagua":true,"Viaje":true,"Custodio":true,"Merienda":true},
        },
        series: [
            {
                name: fecha,
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                //objet {name:"casa",value:8888}
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart2.setOption(option);
}

function chart_productos(legend, data) {

    let series = new Array(data.length);
    let ser;
    for (let i = 0; i < data.length; i++) {
        ser =  {name: data[i].name, "type": 'bar', "data": data[i].value}
        series.push(ser);
    }
    var myChart3 = echarts.init(document.getElementById('all-productos'), 'roma');

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: "right",
            bottom: "88%",
            feature: {
                dataView: {show: true, readOnly: false,title:"Vista de Datos",lang:['Vista de Datos', 'Cerrar', 'Recargar']},
                magicType: {show: true,title:"Tipo", type: ['line', 'bar','stack']},
                restore: {show: true,title:"Recargar"},
                saveAsImage: {show: true,title:"Captura"},

            }
        },
        calculable: true,
        legend: {
            //categorias
            data: legend//['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',

                data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Bajas (Unidad)'
            }
        ],
        series: series
    };

    myChart3.setOption(option);
};



