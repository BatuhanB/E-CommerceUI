import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../productmodels/list-products';
import { ProductService } from 'src/app/admin/services/product/product.service';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

declare var $: any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, AfterViewInit {
  listModel: ListProduct[];

  trashIcon = faTrash;
  penIcon = faPenToSquare;

  displayedColumns: string[] = [
    'name',
    'price',
    'stock',
    'isActive',
    'createDate',
    'updatedDate',
    'select',
    'delete'
  ];
  dataSource = new MatTableDataSource<ListProduct>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() listProduct: EventEmitter<any> = new EventEmitter();
  selectedProduct: ListProduct;

  ngOnInit(): void {
    this.getAll();
  }
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private service: ProductService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngAfterViewInit(): void { }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  async getAll() {
    this.spinnerService.show('spinner1');
    let pageNumber = this.paginator ? this.paginator.pageIndex : 0;
    let pageSize = this.paginator ? this.paginator.pageSize : 10;

    const data: { totalCount: number, data: ListProduct[] } =
      await this.service.getAll(pageNumber + 1, pageSize, this.onSuccess);

    this.dataSource.data = data.data;
    this.dataSource.sort = this.sort;
    this.paginator.length = data.totalCount;
  }

  onSuccess = () => {
    this.spinnerService.hide('spinner1');
  }

  getById(id: string) {
    this.service.getById(id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
        this.onSelectedProduct();
      }
    })
  }

  delete(id: string, event: MouseEvent) {
    let target = <HTMLSelectElement>event.target;
    let td = <HTMLTableCellElement>target.closest('tr').childNodes.item(1).parentElement;
    $(td).fadeOut(1000);
  }

  onSelectedProduct() {
    this.listProduct.emit(this.selectedProduct);
  }

  pageChanged() {
    this.getAll();
  }
}
