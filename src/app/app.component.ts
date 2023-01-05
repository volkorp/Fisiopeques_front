import { Component,  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'api';
  completeDictionary: any = [];  
  todayUsers: any = [];
  usersShown:any = [];

  name: string = "";
  phone: string = "";
  items: MenuItem[] = [];
  showAll: boolean = true;
  confirmedBadge: string = "0";

  isManagementContext: boolean = false;

  trollCounter: number = 0;
  trollBoolean: boolean = false;

  static readonly RELOAD_APPOINTMENTS_IN_MILLISECONDS: number = 60000;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'key':'holi'
    }),
  };
  
  ngOnInit(): void {
    this.items = [
      {
          label: 'Filtrar',          
          icon: 'pi pi-filter',
          command: () => this.seeConfirmed()
      },{
        label: 'Cambiar contexto',
        icon: 'pi pi-shield',
        command: () => this.switchContext()
      },
      {
        label: 'Lanzar notificaciones',
        icon: 'pi pi-send',
        command: () => this.notify().subscribe(data =>{
          console.log(data);
        })
      }
    ];

    this.getDictionary().subscribe(data =>{
      this.completeDictionary = data;
      // console.log(data);
      // this.todayUsers = data;
      // this.usersShown = [...this.todayUsers];
      // this.updateConfirmedBadge();

    });

    interval(AppComponent.RELOAD_APPOINTMENTS_IN_MILLISECONDS).subscribe(() => {
      this.getAppointments().subscribe(data =>{
        this.todayUsers = [...data];
        if (!this.isManagementContext)
          this.usersShown = [...data];
      });
  
      this.updateConfirmedBadge();
    });
  }

  add(){
    var alreadyExists = false;

    this.todayUsers.forEach((element: { name: string; }) => {
      if(element.name == this.name) {
        alreadyExists = true;
      }
    });

    if(!alreadyExists){ 
      this.todayUsers.push({name: this.name, number: this.phone, confirmed: false});
      this.messageService.add({severity:'success', summary:'¡Conseguido!', detail:'Registro añadido correctamente.'});
    }
    else this.messageService.add({severity:'error', summary:'Ooops!', detail:'Ya existe un registro con ese nombre.'});

    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // const body = { title: 'Angular POST Request Example' };
    // this.http.post<any>('link', body, { headers }).subscribe((data: any) => {a
    //     this.dictionary = data;
    // });
    
    this.name="";
    this.phone="";
  }

  seeConfirmed(){    
    this.showAll = !this.showAll;
    this.usersShown = []
    
    if (this.showAll){
      this.usersShown = [...this.todayUsers];      
    }else{
      this.todayUsers.forEach((element: any) => {        
        if(element.confirmed) {
          this.usersShown.push(element);
        }        
      });
    }
  }

  deleteProduct(product:any){
    this.usersShown.forEach((element:any, index:number) => {
      if(element.number == product.number){
        this.usersShown.splice(index, 1);
      }
    });
       
    //AQUÍ enviar la colección entera otra a la api para machacar el registro
  }

  updateConfirmedBadge(){
    var confirmed  = 0;

    this.usersShown.forEach((element:any, index:number) => {
      if(element.confirmed){
        confirmed += 1;
      }
    });

    this.confirmedBadge = confirmed.toString();
  }

  switchContext(){
    this.isManagementContext = !this.isManagementContext;
    this.usersShown = [];

    if(this.isManagementContext){
      this.usersShown = [...this.completeDictionary];
    }else{
      this.usersShown = [...this.todayUsers];
    }
  }

  trollFunction(){
    this.trollCounter += 1;

    if(this.trollCounter == 7){
      this.trollBoolean = true;
    }
  }

  getDictionary(): Observable<any> {
    return this.http.get('http://localhost:3000/dictionary',  {headers: this.httpOptions.headers});
  }
 
  getAppointments(): Observable<any> {
    return this.http.get('http://localhost:3000/todayList',  {headers: this.httpOptions.headers});
  }

  notify(): Observable<any> {    
    this.messageService.add({severity:'success', summary:'Lanzando...', detail:'En breve se cargarán los datos en la interfaz.'});
    return this.http.get('http://localhost:3000/launchNotifications/Lau', {headers: this.httpOptions.headers});
  }
  
}