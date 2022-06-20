import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from 'src/app/models/articulo';
import { ArticuloFamilia } from 'src/app/models/articulo-familia';
import { ArticuloFamiliaService } from 'src/app/services/articulo-familia.service';

interface DialogData {
  articulo: Articulo;
  op: string;
}

@Component({
  selector: 'app-abmc-articulo',
  templateUrl: './abmc-articulo.component.html',
  styleUrls: ['./abmc-articulo.component.scss'],
})
export class AbmcArticuloComponent implements OnInit {
  public titulo: string;
  public articulo: Articulo;
  public form: FormGroup;
  public optionsActivo = [
    { value: true, name: 'Sí' },
    { value: false, name: 'No' },
  ];
  public articuloFamilias: ArticuloFamilia[];
  public opcionEliminar: boolean = false;
  public opcionVer: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articuloFamiliaService: ArticuloFamiliaService,
    private dialogRef: MatDialogRef<AbmcArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    switch (this.data.op) {
      case 'ver':
        this.opcionVer = true;
        this.titulo = `Detalle del artículo N°${this.data.articulo.IdArticulo}`;
        this.crearFormulario();
        this.cargarFormulario();
        this.deshabilitarFormulario();
        break;

      case 'editar':
        this.titulo = `Editar artículo N°${this.data.articulo.IdArticulo}`;
        this.crearFormulario();
        this.cargarFormulario();
        break;

      case 'eliminar':
        this.opcionEliminar = true;
        this.titulo = `¿Seguro desea eliminar el artículo N°${this.data.articulo.IdArticulo}?`;
        this.articulo = this.data.articulo;
        break;

      case 'agregar':
        this.titulo = 'Agregar nuevo artículo';
        this.crearFormulario();
        this.obtenerArticuloFamilias();
        break;
    }
  }

  private crearFormulario(): void {
    this.form = this.fb.group({
      txtNombre: ['', Validators.required],
      txtPrecio: ['', Validators.required],
      txtStock: ['', Validators.required],
      txtCodigoBarra: ['', Validators.required],
      cboFamilia: ['', Validators.required],
      dpFechaAlta: [new Date(), Validators.required],
      cboActivo: [true, Validators.required],
    });
  }

  private obtenerArticuloFamilias(): void {
    this.articuloFamiliaService.obtenerArticuloFamilias().subscribe((res) => {
      this.articuloFamilias = res;
    });
  }

  private cargarFormulario(): void {
    this.txtNombre?.setValue(this.data.articulo.Nombre);
    this.txtPrecio?.setValue(this.data.articulo.Precio);
    this.txtStock?.setValue(this.data.articulo.Stock);
    this.txtCodigoBarra?.setValue(this.data.articulo.CodigoDeBarra);
    this.dpFechaAlta?.setValue(this.data.articulo.FechaAlta);
    this.cboActivo?.setValue(this.data.articulo.Activo);

    this.articuloFamiliaService.obtenerArticuloFamilias().subscribe((res) => {
      this.articuloFamilias = res;
      this.cboFamilia?.setValue(
        this.articuloFamilias.find(
          (x) => x.IdArticuloFamilia === this.data.articulo.IdArticuloFamilia
        )?.IdArticuloFamilia
      );
    });
  }

  private deshabilitarFormulario(): void {
    this.txtNombre?.disable();
    this.txtPrecio?.disable();
    this.txtStock?.disable();
    this.txtCodigoBarra?.disable();
    this.cboFamilia?.disable();
    this.dpFechaAlta?.disable();
    this.cboActivo?.disable();
  }

  public aceptar(): void {
    if (this.opcionEliminar) {
      this.dialogRef.close(this.articulo);
    } else {
      this.dialogRef.close(
        new Articulo(
          this.data.articulo?.IdArticulo,
          this.txtNombre?.value,
          this.txtPrecio?.value,
          this.txtCodigoBarra?.value,
          this.cboFamilia?.value,
          this.txtStock?.value,
          this.dpFechaAlta?.value,
          this.cboActivo?.value
        )
      );
    }
  }

  public cancelar(): void {
    this.dialogRef.close();
  }

  public get txtNombre() {
    return this.form.get('txtNombre');
  }

  public get txtPrecio() {
    return this.form.get('txtPrecio');
  }

  public get txtStock() {
    return this.form.get('txtStock');
  }

  public get txtCodigoBarra() {
    return this.form.get('txtCodigoBarra');
  }

  public get cboFamilia() {
    return this.form.get('cboFamilia');
  }

  public get dpFechaAlta() {
    return this.form.get('dpFechaAlta');
  }

  public get cboActivo() {
    return this.form.get('cboActivo');
  }
}
