import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { changeTree } from "./event.actions";

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private http: HttpClient
    ) {}
    
    // loadData$ = createEffect(() =>
    //     this.actions$.pipe(
    //       ofType(changeTree),
    //       concatMap(() =>
            
    //       )
    //     ), {dispatch: false}
    // );
}