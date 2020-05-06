import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private API_KEY = '';

  private userToken: string;

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {

    this.leerToken();
   }


  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    console.log(usuario);
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken:  true
    };
    return this.http.post( `${this.url}:signInWithPassword?key=${this.API_KEY}`, authData)
    .pipe(map( resp =>{
      console.log('ingreso al mapa loggin');
      this.guardarToken(resp['idToken']);
      return resp;
    }));
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken:  true
    };
    return this.http.post( `${this.url}:signUp?key=${this.API_KEY}`, authData).pipe(
      map(  resp => {
        console.log('Entro en el usuario mapa')
        this.guardarToken(resp['idToken']);
        return resp;
      }));

  }

  private guardarToken(idToken: string){
    let hoy = new Date();

    this.userToken = idToken;
    localStorage.setItem( 'token', idToken);
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else{
      this.userToken = '';
    }
    return this.userToken;
  }



  estaAutenticado(): boolean {

    if(this.userToken.length <2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()) {
      return true;
    } else { return false;}
  }
}
