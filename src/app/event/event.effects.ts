import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap, switchMap} from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, EventFailure, changeTree, moveEventSuccess, changeEvent, deleteEvent, getEvents, getEventSuccess } from "./event.actions";
import { Store } from "@ngrx/store";
import { EventState } from "./reducers";
import { EventBackend } from "./event-model";
import { NodesService } from 'src/app/shared/nodes'

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private store: Store<EventState>,
        private nodes: NodesService
    ) {}
    
    addEvent$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addEvent),
          mergeMap((event: any) =>
            this.service.addEvent(event)
            .pipe(
              tap((data: number) => this.nodes.setState(data, event.event.id, this.nodes.childs)),
              map(() => changeTree()),
              catchError(() => {
                this.nodes.setState('error', event.event.id, this.nodes.childs)
                return of(EventFailure({message: `Couldn\'t add ${event.start} - ${event.end}`}))
              })
            )
          )
        )
    );

    moveEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeEvent),
            mergeMap((event: any) =>
              this.service.putEvent(event)
              .pipe(
                tap(() => this.nodes.setState(1, event.event.id, this.nodes.childs, 'move')),
                map(() => changeTree()),
                catchError(() => {
                  this.nodes.setState('error', event.event.id, this.nodes.childs)
                  return of(EventFailure({message: `Couldn\'t change ${event.start} - ${event.end}`}))
                })
              )
            )
        )
    );

    getEvents$ = createEffect(() => 
      this.actions$.pipe(
        ofType(getEvents),
        concatMap((date: any) => 
          this.service.getEvents(date)
          .pipe(
            switchMap(info => [
              getEventSuccess({data: info}),
              changeTree()
            ]),
            tap((data: any) => {
              
              // nodes.setNodes(new Date())
            }),
            catchError(() => 
              of(EventFailure({message: 'Couldn\'t access events'}))
            )
          )
        )
      )
    )


}