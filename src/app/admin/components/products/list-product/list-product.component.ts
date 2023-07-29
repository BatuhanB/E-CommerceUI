import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../productmodels/list-products';
import { ProductService } from 'src/app/admin/services/product.service';

declare var $: any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, AfterViewInit {
  listModel: ListProduct[];

  displayedColumns: string[] = [
    'name',
    'price',
    'stock',
    'isActive',
    'createDate',
    'updatedDate',
    'select'
  ];
  dataSource = new MatTableDataSource<ListProduct>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAll();
  }
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private service: ProductService,
    private spinnerService:NgxSpinnerService
  ) {}

  ngAfterViewInit(): void {}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAll() {
    this.spinnerService.show('spinner1');
    let pageNumber = this.paginator ? this.paginator.pageIndex : 0;
    let pageSize = this.paginator ? this.paginator.pageSize : 10;
    this.service.getAll(pageNumber + 1,pageSize).subscribe({
      next: (data) => {
        this.spinnerService.hide('spinner1');
        this.dataSource.data = data.data;
        this.dataSource.sort = this.sort;
        this.paginator.length = data.totalCount;
      },
    });
  }

  getById(id:string){
    this.service.getById(id).subscribe({
      next:(data) => {
        this.service.setSelectedProduct(data);
      }
    })
  }

  pageChanged(){
    this.getAll();
  }
}
