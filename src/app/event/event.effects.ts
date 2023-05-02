import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, EventFailure, changeTree, moveEventSuccess, changeEvent, deleteEvent, getEvents, getEventsSuccess } from "./event.actions";
import { Store } from "@ngrx/store";
import { EventState } from "./reducers";
import { EventBackend } from "./event-model";
import * as nodes from 'src/app/shared/nodes'

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
          mergeMap((event: any) =>
            this.service.addEvent(event)
            .pipe(
                tap((data: number) => nodes.setState(data, event.event.id, nodes.childs)),
                catchError(() => {
                  nodes.setState('error', event.event.id, nodes.childs)
                  return of(EventFailure({message: `Couldn\'t add ${event.start} - ${event.end}`}))
                })
            )
          )
        ), {dispatch: false}
    );

    moveEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeEvent),
            mergeMap((event: any) =>
              this.service.putEvent(event)
              .pipe(
                tap(() => nodes.setState(1, event.event.id, nodes.childs, 'move')),
                catchError(() => {
                  nodes.setState('error', event.event.id, nodes.childs)
                  return of(EventFailure({message: `Couldn\'t change ${event.start} - ${event.end}`}))
                })
              )
            )
        ), {dispatch: false}
    );

    deleteEvent$ = createEffect(() => 
      this.actions$.pipe(
        ofType(deleteEvent),
        concatMap((eventInfo: any) => 
          this.service.deleteEvent(eventInfo.event.ID)
          .pipe(
            tap(() => nodes.deleteEvent(eventInfo.event, eventInfo.parent, eventInfo.index)),
            catchError(() => {
              return of(EventFailure({message: `Couldn\'t remove ${eventInfo.event.start} - ${eventInfo.event.end}`}))
            })
          )
        )
      ), {dispatch: false}
    )

    getEvents$ = createEffect(() => 
      this.actions$.pipe(
        ofType(getEvents),
        exhaustMap((date: any) => 
          this.service.getEvents(date).pipe(
            map(info => getEventsSuccess({data: info}))
          )
        )
      )
    )


}