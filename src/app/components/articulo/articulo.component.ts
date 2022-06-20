import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloFamilia } from 'src/app/models/articulo-familia';
import { ArticuloFamiliaService } from 'src/app/services/articulo-familia.service';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AbmcArticuloComponent } from './abmc-articulo/abmc-articulo.component';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    'IdArticulo',
    'Nombre',
    'Precio',
    'Stock',
    'IdArticuloFamilia',
    'FechaAlta',
    'Activo',
    'Acciones',
  ];
  public dataSource = new MatTableDataSource<Articulo>();
  public options = [
    { value: true, name: 'Sí' },
    { value: false, name: 'No' },
  ];
  public form: FormGroup;
  public articuloFamilias: ArticuloFamilia[];

  constructor(
    private articuloService: ArticuloService,
    private articuloFamiliaService: ArticuloFamiliaService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      txtNombre: ['', Validators.required],
      cboActivo: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public buscarArticulos(): void {
    if (this.form.invalid) {
      this.snackBar.open('Asegúrese de llenar todos los campos.', 'Cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this.articuloService
        .obtenerArticulosPorNombreYActivo(
          this.txtNombre?.value,
          this.cboActivo?.value
        )
        .subscribe((res) => {
          this.dataSource.data = res.Items;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

      this.articuloFamiliaService.obtenerArticuloFamilias().subscribe((res) => {
        this.articuloFamilias = res;
      });
    }
  }

  public obtenerArticuloFamilia(idArticuloFamilia: number): string {
    const res = this.articuloFamilias?.find(
      (x) => x.IdArticuloFamilia === idArticuloFamilia
    );
    return res ? res.Nombre : '';
  }

  public agregarArticulo(): void {
    const dialogRef = this.dialog.open(AbmcArticuloComponent, {
      width: '500px',
      data: { op: 'agregar' },
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((articuloAgr) => {
      if (articuloAgr) {
        console.log(articuloAgr);

        this.articuloService.agregarArticulo(articuloAgr).subscribe((res) => {
          this.snackBar.open('Artículo agregado correctamente.', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snack-bar-success',
            duration: 3000,
          });
          this.buscarArticulos();
        });
      }
    });
  }

  public verArticulo(articulo: Articulo): void {
    this.dialog.open(AbmcArticuloComponent, {
      width: '500px',
      data: { articulo, op: 'ver' },
      restoreFocus: false,
      autoFocus: false,
    });
  }

  public editarArticulo(articulo: Articulo): void {
    const dialogRef = this.dialog.open(AbmcArticuloComponent, {
      width: '500px',
      data: { articulo, op: 'editar' },
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((articuloMod) => {
      console.log(articuloMod);

      if (articuloMod) {
        this.articuloService
          .editarArticulo(articulo.IdArticulo, articuloMod)
          .subscribe((res) => {
            this.snackBar.open('Artículo editado correctamente.', 'Cerrar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'snack-bar-success',
              duration: 3000,
            });
            this.buscarArticulos();
          });
      }
    });
  }

  public eliminarArticulo(articulo: Articulo): void {
    const dialogRef = this.dialog.open(AbmcArticuloComponent, {
      width: '500px',
      data: { articulo, op: 'eliminar' },
      restoreFocus: false,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((articuloElim) => {
      if (articuloElim) {
        this.articuloService
          .eliminarArticulo(articuloElim.IdArticulo)
          .subscribe((res) => {
            this.buscarArticulos();
            this.dataSource._updateChangeSubscription();
            this.snackBar.open('Artículo eliminado correctamente.', 'Cerrar', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'snack-bar-success',
              duration: 3000,
            });
          });
      }
    });
  }

  public get txtNombre() {
    return this.form.get('txtNombre');
  }

  public get cboActivo() {
    return this.form.get('cboActivo');
  }
}
