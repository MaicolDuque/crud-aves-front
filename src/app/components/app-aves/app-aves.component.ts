import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ave } from 'src/app/models/ave';
import { Aves } from 'src/app/models/aves';
import { Zona } from 'src/app/models/zona';
import swal from 'sweetalert2';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-aves',
  templateUrl: './app-aves.component.html',
  styleUrls: ['./app-aves.component.css']
})
export class AppAvesComponent implements OnInit {
  
  API_URI = "http://localhost:8080/api/";
  allAves: Ave[];
  allZonas: Zona[];
  aveEdit: any;
  addEdit: string;
  controlEdit: number;
  search = {
    zona: "all",
    nombre: ""
  }
  ave = { cdAve: "", nombreComun: "", nombreCientifico: "" };
  

  constructor(private http: HttpClient) { 
   
  }

  
  
  ngOnInit() {   
    this.http.get<Ave[]>(`${this.API_URI}aves`).subscribe(
      (res: Ave[]) => {
        this.allAves = res;        
      }  
    )

    this.http.get<Zona[]>(`${this.API_URI}zonas`).subscribe(
      (res: Zona[]) => {
        this.allZonas = res;   
        console.log("ZOnas",this.allZonas)     
      }  
    )

  }


  searchAve(){
    console.log("SEARCH",this.search);
    if(this.search.zona != "all" && this.search.nombre != ""){
      //buscar por ave y zona
      this.http.get<Ave[]>(`${this.API_URI}avesByZonaAndName/${this.search.zona}/${this.search.nombre}`).subscribe(
        (res: Ave[]) => {
          this.allAves = res;        
        }  
      )
    }else if(this.search.zona == "all" && this.search.nombre != ""){
      //buscar por ave
      this.http.get<Ave[]>(`${this.API_URI}avesByName/${this.search.nombre}`).subscribe(
        (res: Ave[]) => {
          this.allAves = res;        
        }  
      )
    }else if(this.search.zona != "all" && this.search.nombre == ""){
      // buscar por zona
      this.http.get<Ave[]>(`${this.API_URI}avesByZona/${this.search.zona}`).subscribe(
        (res: Ave[]) => {
          this.allAves = res;        
        }  
      )
    }else{
      //todas las aves
      this.http.get<Ave[]>(`${this.API_URI}aves`).subscribe(
        (res: Ave[]) => {
          this.allAves = res;        
        }  
      )
    }
  }




  onEditAve(id){
    this.controlEdit = 0;
    this.addEdit = "Editar";   
    this.ave = this.allAves.filter(data => data.cdAve == id)[0]  
  }

  onAddAve(){
    this.ave = { cdAve: "", nombreComun: "", nombreCientifico: "" };
    this.controlEdit = 1;
    this.addEdit = "Agregar";       
  }

  agregarGuardar(){    
    if(this.controlEdit){    
      this.http.post<Ave>(`${this.API_URI}aves`, this.ave, httpOptions)
      .subscribe(res => console.log("Done!!!", res))

      this.allAves.push(this.ave);
    }else{
      this.http.put<Ave>(`${this.API_URI}aves/${this.ave.cdAve}`, this.ave, httpOptions)
      .subscribe(res => console.log("Done update!!!", res))
    }
    
    this.ave = { cdAve: "", nombreComun: "", nombreCientifico: "" };
  }

  deleteAve(id){
    swal.fire({
      title: "¿Estás seguro que deseas eliminar la ave?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",     
    })
    .then((willDelete) => {
      
      if (willDelete.value) {
        this.http.delete(`${this.API_URI}avesPais/${id}`, httpOptions)
        .subscribe(res => {
          console.log("Deleted Ave pais!!!")
          this.http.delete(`${this.API_URI}aves/${id}`, httpOptions)
          .subscribe(res2 => console.log("Deleted!!!", res2))
        })

        this.allAves = this.allAves.filter(data => data.cdAve != id)
      }
    });
    

    
    
    
  }

}
