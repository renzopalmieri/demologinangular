import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from '../../../assets/js/sweetalert2.js';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordarusuario = false;
  Usuario: UsuarioModel;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit() {


    this.Usuario =  new UsuarioModel();


    if (localStorage.getItem('email')) {
      this.Usuario.email = localStorage.getItem('email');
      this.recordarusuario = true;
    }
  }


  ingresar(form: NgForm) {
    console.log(this.Usuario);

    if(form.invalid) {return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'espere por favor...'

    });
    Swal.showLoading();


    this.service.login(this.Usuario).subscribe(resp => {
        console.log(resp);

        Swal.close();

        if (this.recordarusuario){
            console.log(this.recordarusuario ,  "validar checkbox");
          localStorage.setItem('email', this.Usuario.email);
        }

        this.router.navigateByUrl('home');

    }, (err) =>{
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        title:'Error al autenticar',
        icon: 'error',
        text: err.error.error.message
      });
    });
    console.log(form.value);
    //this.router.navigateByUrl('home');


  }

}
