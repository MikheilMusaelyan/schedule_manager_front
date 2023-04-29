import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, addeventFailure, changeTree } from "./event.actions";
import { Store } from "@ngrx/store";
import { EventState } from "./reducers";

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private store: Store<EventState>
    ) {}
    
    loadData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addEvent),
          concatMap((event: any) =>
            this.service.addEvent(event).pipe(
                map(data => {
                    return addEventSuccess()
                }),
                catchError(error => of(addeventFailure()))
            )
          )
        )
    );
}