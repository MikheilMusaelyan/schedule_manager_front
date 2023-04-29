import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, changeTree } from "./event.actions";
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
                    return this.store.dispatch(addEventSuccess())
                })
            )
          )
        ), {dispatch: false}
    );
}