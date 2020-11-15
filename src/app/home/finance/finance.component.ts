import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/services/finance.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  currencies;

  stocks;

  constructor(private financeService: FinanceService) { }

  ngOnInit() {
    this.financeService.getata().pipe(take(1)).subscribe((res) => {
      let arrayCurrency = [];
      arrayCurrency.push(res.results.currencies.EUR);
      arrayCurrency.push(res.results.currencies.BTC);
      arrayCurrency.push(res.results.currencies.GBP);
      arrayCurrency.push(res.results.currencies.USD);
      this.currencies = arrayCurrency;

      let arrayStocks = [];
      arrayStocks.push(res.results.stocks.NASDAQ);
      arrayStocks.push(res.results.stocks.IBOVESPA);
      arrayStocks.push(res.results.stocks.NIKKEI);
      arrayStocks.push(res.results.stocks.CAC);
      this.stocks = arrayStocks;
    })
  }

}
