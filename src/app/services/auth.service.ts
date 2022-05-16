import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {first} from 'rxjs/operators';
import {user} from '../models/registro-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    private toastr: ToastrService) {
     }

  sendEmail(){
    return new Promise((resolve, reject) => {
      this.afAuth.currentUser.then((user) => {
        return user?.sendEmailVerification();
      }, (error) => {
        reject(error);
      });
    });
  }

  login(email:string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  register(email:string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.sendEmail();
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
      this.afAuth.signOut().then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  resetPassword(email: string){
    return new Promise((resolve, reject) => {
      this.afAuth.sendPasswordResetEmail(email).then((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error);
      })
    })
  }

  async getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  createUser(data: any, uid: any){
    return this.db.collection('users').doc(uid).set(data);
  }

  public getUser(documentEmail: string) { 
    return  this.db.collection('users').doc(documentEmail).snapshotChanges();; 
  }

  public getAllUsers() { 
    return  this.db.collection('users').snapshotChanges();; 
  }

  public updateUser(documentId: string, data: any) { 
    return  this.db.collection('users').doc(documentId).set(data); 
  } 
}
