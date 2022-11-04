import { Component,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'api';
  completeDictionary: any = [{name: "Test", number:"31425312", confirmed: true}, {name: "Test", number:"31312", confirmed: false},{name: "Test", number:"311275312", confirmed: true},{name: "Test", number:"31259312", confirmed: true},{name: "Test", number:"31253129", confirmed: true},{name: "Test", number:"312345312", confirmed: true},{name: "Test", number:"4444", confirmed: true},{name: "Test", number:"311256012", confirmed: true},{name: "Test", number:"31025312", confirmed: true},{name: "Test", number:"031253120", confirmed: true},{name: "Test", number:"3012953012", confirmed: true}];  
  todayUsers: any = [{name: "Test", number:"31425312", confirmed: true}, {name: "Test", number:"31312", confirmed: false}];
  usersShown:any = [];

  name: string = "";
  phone: string = "";
  items: MenuItem[] = [];
  showAll: boolean = true;
  confirmedBadge: string = "0";

  isManagementContext: boolean = false;

  trollCounter: number = 0;
  trollBoolean: boolean = false;

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
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
      }
  ];

  this.usersShown = [...this.todayUsers];
    // fetch('./assets/dictionary.json').then(res => res.json()).then(jsonData => {
    //   this.dictionary = jsonData;
      
    //   console.log(this.dictionary);
    // });
    this.updateConfirmedBadge();
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
    this.updateConfirmedBadge();

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

    this.updateConfirmedBadge();
  }

  deleteProduct(product:any){
    this.usersShown.forEach((element:any, index:number) => {
      if(element.number == product.number){
        this.usersShown.splice(index, 1);
      }
    });
    
    this.updateConfirmedBadge();

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

    this.updateConfirmedBadge();
  }

  trollFunction(){
    this.trollCounter += 1;

    if(this.trollCounter == 7){
      this.trollBoolean = true;
    }
  }
}
