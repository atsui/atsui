import {Component} from '@angular/core';
import {PageEvent} from '@angular/material';

/**
 * @title More Configurable paginator
 */
@Component({
  selector: 'paginator-demo-example',
  templateUrl: 'paginator-demo-example.html',
  styleUrls: ['paginator-demo-example.css']
})
export class PaginatorDemoExample {
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
