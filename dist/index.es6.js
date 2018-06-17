import { PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `WhcgChartFeeder`
 * 
 * @customElement
 * @polymer
 */

class WhcgChartFeeder extends PolymerElement {
    
    static get properties() {
        return {
            jsoninput: {
                type: String,
                readOnly: false,
                observer: '_jsoninputChanged'
            },
            chartjs: {
                type: String,
                notify: true,
                readOnly: false,
            },
            datapackage: {
                type: String,
                readOnly: false,
            },
        }
    }

    _jsoninputChanged() {
        this._chartJsTransformer();
    }

    getRandomColor() {   
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.2)';    
    }

    _chartJsTransformer() {
        let str = this.jsoninput;
        let parsedStr = JSON.parse(str);
        let result = parsedStr.result;

        let columnNames = Object.keys(result[0].data[this.datapackage].dataset);
        let color = 'grey';

        let datasets = result.map((item) => {
            let obj = {};

            obj.label = item.object;
            obj.backgroundColor = this.getRandomColor();
            obj.data = Object.values(item.data[this.datapackage].dataset);
            obj.borderColor = color;
            obj.borderWidth = 1;
            return obj;
        });

        let chartJsData = {};
        chartJsData.labels = columnNames;
        chartJsData.datasets = datasets;
        let chartJsDataJson = JSON.stringify(chartJsData);
        this.chartjs = chartJsDataJson;
    }

    ready() {
        super.ready();
        this.jsoninput = `{
            "result": [
                {
                    "object": "Elkostnad",
                    "data": {
                                "yearlyamounts": {
                                    "label": "öre/kWh",
                                    "dataset": {
                                        "2018": 40,
                                        "2014": 60,
                                        "2010": 100
                                    } 
                                },
                                "suppliers": {
                                    "label": "Leverantör",
                                    "dataset": {
                                        "2018": 56,
                                        "2014": 234,
                                        "2010": 45
                                    }  
                                }
                            }
                },
                {
                    "object": "Vattenkostnad",
                    "data": {
                                "yearlyamounts": {
                                    "label": "kr/m3",
                                    "dataset": {
                                        "2018": 400,
                                        "2014": 607,
                                        "2010": 100
                                    } 
                                },
                                "suppliers": {
                                    "label": "Leverantör",
                                    "dataset": {
                                        "2018": 76,
                                        "2014": 37,
                                        "2010": 77
                                    }  
                                }
                            }
                },
                {
                    "object": "Hyresintäkter",
                    "data": {
                                "yearlyamounts": {
                                    "label": "kr",
                                    "dataset": {
                                        "2018": 140,
                                        "2014": 260,
                                        "2010": 10
                                    } 
                                },
                                "suppliers": {
                                    "label": "Hyresgäst",
                                    "dataset": {
                                        "2018": "Olle",
                                        "2014": "Adam",
                                        "2010": "Stina"
                                    }  
                                }
                            }
                }
            ]
        }`;
    }
}

window.customElements.define('whcg-chart-feeder', WhcgChartFeeder);

export { WhcgChartFeeder };