import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[]=[];
  private apiKey: string='BW14Nby7CLcE65IcMuUWL9PkeI3E3rsK'
  public resultados: Gif[]=[];
  public servicioUrl='https://api.giphy.com/v1/gifs'



  get historial(){
    return [...this._historial]
  }

  constructor(private http:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('result')!) || [];
  }

  buscarGifs( query:string ){

    query=query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params= new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','6')
      .set('q',query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados=resp.data;
        localStorage.setItem('result',JSON.stringify(this.resultados) );
      });
  }
}
