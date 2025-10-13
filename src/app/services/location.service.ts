import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Root2 } from "../interfaces/location";


@Injectable({
    providedIn: 'root'
})

export class LocationService {
    //location Api
    locationUrl = "https://api.locationiq.com/v1/autocomplete?key=pk.b00c35b446373a6ef5a87f7b18f9d34b&limit=5&dedupe=1&"
    //location Api

    constructor(private http: HttpClient) { }

    searchLocation(query:string){
        return this.http.get<Root2[]>(this.locationUrl+`q=${query}`)
    }








}