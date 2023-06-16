import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, setDoc, updateDoc, getDoc} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { User } from '../User';


export interface NewTour {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  avalible:number;
  about:string;
  image: string;
}

export interface IdTour {
  id:string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  price: number;
  capacity: number;
  avalible:number;
  about:string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {


  constructor(private firestore: Firestore) { }

  getTours():any {
    const toursRef = collection(this.firestore, 'tours');
    return collectionData(toursRef, {idField:'id'}) as Observable<any>;
  }


  getTourById(id:any): Observable<NewTour> {
    const noteDocRef = doc(this.firestore, `tours/${id}`);
    return docData(noteDocRef) as Observable<NewTour>;
  }

  async getTourData(id:any){
    const noteDocRef = doc(this.firestore, `tours/${id}`);
    const docSnap = await getDoc(noteDocRef);
    let data = docSnap.data()
    if(data != undefined){
      return data.avalible;
    }
    return 0
  }

  getUserTours(uid:any): Observable<any> {
    const usersRef = collection(this.firestore, `user/${uid}/purchased`);
    return collectionData(usersRef, {idField:'id'}) as Observable<any>;
  }

  async getAllTourData(id:any){
    const noteDocRef = doc(this.firestore, `tours/${id}`);
    const docSnap = await getDoc(noteDocRef);
    let data = docSnap.data()
    if(data != undefined){
      return data;
    }
    return {
      quantity:0,
      name:'nie znaleziono wycieczki',
      startDate:'',
      endDate:'',
      price:0
    }

  }
  addTour(tour: NewTour) {
    const toursRef = collection(this.firestore, 'tours');
    Object.assign(tour, {avalible:tour.capacity})
    Object.assign(tour, {active:true})
    return addDoc(toursRef, tour);
  }

  async updateTour(id:string, quantity:number){
    let data:any = await this.getTourData(id)
    const daneRef = collection(this.firestore, 'tours');
    let newValue = data - quantity

    updateDoc(doc(daneRef,id), {avalible:newValue});
}

  deleteTour(id: string) {
    const noteDocRef = doc(this.firestore, `tours/${id}`);
    updateDoc(noteDocRef, {active:false});
  }

  async getQuantityByID(uid:any, tour: any){
    const toursRef = doc(this.firestore, `user/${uid}/purchased`, tour.id);
    const docSnap = await getDoc(toursRef);
    let data = docSnap.data()
    if(data != undefined){
      return data.quantity;
    }
    return 0

  }

  async addBought(tour: any, uid:any, quantity:number) {
    const toursRef = doc(this.firestore, `user/${uid}/purchased`, tour.id);
    let quant = await this.getQuantityByID(uid, tour)
    await setDoc(toursRef, {quantity: quantity + quant});
  }

  async addUser(user:User, uid:string) {
    await setDoc(doc(this.firestore, "user", uid), {
      email: user.email,
      username: user.username,
      guest: false,
      client:true,
      manager: false,
      admin: false,
      banned: false,
    });
  }

  getUserById(uid:any){
    let user:Observable<User>;
    if(uid === ''){
      user = of({ email: '' ,  username:"" , guest: true,client:false,manager: false,admin: false,banned: false,}) as Observable<User>
    }else{
      const noteDocRef = doc(this.firestore, `user/${uid}`);
      user = docData(noteDocRef) as Observable<User>
    }
    return user;
  }

  getUsers():any {
    const usersRef = collection(this.firestore, 'user');
    return collectionData(usersRef, {idField:'id'}) as Observable<any>;
  }

  updateUser(uid:string, x:any){

      const daneRef = collection(this.firestore, 'user');
      updateDoc(doc(daneRef,uid), x);
  }

  addComment(tourId:any, comment:any, uid:any){
    const comentsRef = doc(this.firestore, `tours/${tourId}/comments`, uid);
    console.log(comment)
    return setDoc(comentsRef, comment);
  }

  getComments(tourId:any):any {
    const toursRef = collection(this.firestore, `tours/${tourId}/comments`);
    return collectionData(toursRef) as Observable<any>;
  }

  isValidForComment(tourId:any, userId:any){
    const docRef = doc(this.firestore, `user/${userId}/purchased/${tourId}`);
    return docData(docRef) as Observable<any>;
  }


  updateRating(id:any, rating:number){
    const daneRef = collection(this.firestore, 'tours');
    updateDoc(doc(daneRef,id), {rating:rating});
  }
}
