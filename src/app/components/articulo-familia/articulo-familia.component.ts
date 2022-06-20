import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloFamilia } from 'src/app/models/articulo-familia';
import { ArticuloFamiliaService } from 'src/app/services/articulo-familia.service';

@Component({
  selector: 'app-articulo-familia',
  templateUrl: './articulo-familia.component.html',
  styleUrls: ['./articulo-familia.component.scss'],
})
export class ArticuloFamiliaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['IdArticuloFamilia', 'Nombre'];
  public dataSource = new MatTableDataSource<ArticuloFamilia>();

  constructor(private articuloFamiliaService: ArticuloFamiliaService) {}

  ngOnInit(): void {
    this.articuloFamiliaService.obtenerArticuloFamilias().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
