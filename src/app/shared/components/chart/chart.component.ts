import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() mockData;

  totalBars = 50;
  newMockData: any;
  realData = [];
  isEmpty = false;
  emptyArray = [];

  constructor() {}

  ngOnInit() {
    this.cloneMockData();
    this.setCent();
    this.setBar();
    console.log(this.newMockData);
  }
  cloneMockData() {
    this.newMockData = JSON.parse(
      JSON.stringify(this.mockData),
    ).propertion.filter(el => {
      return el.num !== 0;
    });
    console.log('newmock data: ', this.newMockData);
  }

  setCent() {
    this.newMockData.forEach(ele => {
      ele.cent = ((ele.num / ele.total) * 100).toFixed(0);
    });
  }
  setBar() {
    if (this.newMockData.length === 0) {
      this.isEmpty = true;
      for (let i = 0; i < this.totalBars; i++) {
        this.emptyArray.push(1);
      }
      return;
    } else {
      // [10.5, 20.3, 19.2]
      const barsAssign = this.newMockData.map(ele => {
        return (ele.num / ele.total) * this.totalBars;
      });
      let bars = []; // [10, 20, 19];
      const points = []; // [0.5, 0.3, 0.2];
      let sum = 0;

      barsAssign.forEach(ele => {
        let integer = Math.floor(ele);
        points.push(ele - integer);
        if (integer === 0) {
          integer = 1;
        }
        bars.push(integer);
        sum += integer;
      });
      while (sum < this.totalBars) {
    
        const maxPoint = Math.max(...points);
        const index = points.indexOf(maxPoint);
        bars[index] = bars[index] + 1; // [11, 20, 19];
        points[index] = 0; 
        sum++;
      }
   
      bars = bars.map(ele => {
        const temp = [];
        for (let i = 0; i < ele; i++) {
          temp.push(1);
        }
        return temp;
      });
   
      bars.forEach((bar, i) => {
        this.newMockData[i].bars = bar;
      });
      console.log(this.newMockData);
    }
  }
}