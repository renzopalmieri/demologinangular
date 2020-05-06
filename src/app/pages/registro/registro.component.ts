import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from '../../../assets/js/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarusuario = false;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'espere por favor...'

    });
    Swal.showLoading();


    if(form.invalid) {
      Swal.fire({
        allowOutsideClick: false,
        title:'Error al autenticar',
        icon: 'error',
        text: 'datos invalidos'
      });



      return;}
    console.log(this.usuario);

    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();

      if(this.recordarusuario){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/login');

    }, (err) =>{
      Swal.fire({
        allowOutsideClick: false,
        title:'Error al autenticar',
        icon: 'error',
        text: err.error.error.message
      });
      console.log(err.error.error.message);
    });
  }


}
