import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, EventFailure, changeTree, moveEventSuccess, moveEvent } from "./event.actions";
import { Store } from "@ngrx/store";
import { EventState } from "./reducers";
import { EventBackend } from "./event-model";
import * as nodes from 'src/app/nodes'

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private store: Store<EventState>
    ) {}
    
    addEvent$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addEvent),
          concatMap((event: any) =>
            this.service.addEvent(event)
            .pipe(
                tap((data: number) => nodes.setId(data, event.event.id, nodes.childs)),
                catchError(() => {
                    nodes.setId(-1, event.event.id, nodes.childs)
                    return of(EventFailure())
                })
            )
          )
        ), {dispatch: false}
    );

    moveEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(moveEvent),
            concatMap((event: any) =>
              this.service.putEvent(event)
              .pipe(
                  map(data => moveEventSuccess()),
                  catchError(error => of(EventFailure()))
              )
            )
        )
    );
}