import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private http: HttpClient
    ) {}
    
    loadData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(''),
          concatMap(() =>
            this.http.get('http://127.0.0.1:8000/api/events/').pipe(
              map((data) => console.log('data'))
            )
          )
        ), {dispatch: false}
    );
}