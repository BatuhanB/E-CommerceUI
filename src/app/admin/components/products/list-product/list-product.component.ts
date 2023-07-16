import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  ];
  dataSource = new MatTableDataSource<ListProduct>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAll();
  }
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private service: ProductService
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
    this.service.getAll().subscribe({
      next: (data) => {
        this.listModel = data;
        this.dataSource.data = this.listModel;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
}
