import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap, switchMap, withLatestFrom, from, takeUntil} from "rxjs";
import { EventService } from "./event.service";
import { HttpClient } from "@angular/common/http";
import { addEvent, EventFailure, changeTree, moveEventSuccess, changeEvent, deleteEvent, getEvents, REMOVEvent, CREATEvent, UPDATEvent, setMessage } from "./event.actions";
import { Store } from "@ngrx/store";
import { EventState } from "./reducers";
import { EventBackend } from "./event-model";
import { NodesService } from 'src/app/shared/nodes'
import { CalendarState } from "../calendar/reducers/calendar.reducer";
import { actuallySelectDate, selectDate } from "../calendar/calendar.actions";
import { selectToday } from "../calendar/calendar.selectors";
import { detectGetEvents } from "./event.selectors";

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private store: Store<CalendarState>,
        private nodes: NodesService
    ) {}
    
    addEvent$ = createEffect(() =>
        this.actions$.pipe(
          ofType(addEvent),
          withLatestFrom(this.store.select(selectToday)),
          concatMap(([event, today]) =>
            this.service.addEvent(event)
            .pipe(
              tap((data: number) => {
                this.nodes.setState(data, event.event.id, this.nodes.childs)
              }),
              switchMap((data) => [
                setMessage({message: 'Event Added Successfully!'}),
                changeTree(),
                CREATEvent({event: {...event.event, serverId: data, id: null}})
              ]),
              catchError(() => {
                this.nodes.setState('error', event.event.id, this.nodes.childs)
                return of(EventFailure({message: `Couldn\'t add ${event.event.start} - ${event.event.end}`}))
              })
            )  
          ),
        )
    );

    moveEvent$ = createEffect(() =>
      this.actions$.pipe(
        ofType(changeEvent),
        concatMap((event: any) =>
          this.service.putEvent(event)
          .pipe(
            tap(() => this.nodes.setState(1, event.event.id, this.nodes.childs, 'move')),
            switchMap((data) => [
              setMessage({message: 'Event Updated Successfully!'}),
              changeTree(),
              UPDATEvent({ event: { ...event.event, id: null, state: '' }})
            ]),
            catchError(() => {
              this.nodes.setState('error', event.event.id, this.nodes.childs)
              return of(EventFailure({message: `Couldn\'t change ${event.start} - ${event.end}`}))
            })
          )
        )
      )
    )

    updateToday$ = createEffect(() =>
      this.actions$.pipe(
        ofType(selectDate),
        withLatestFrom(this.store.select(selectToday)),
        withLatestFrom(this.store.select(detectGetEvents)),
        concatMap(([[action, state], storeEvents]) => {
          const newDate = new Date(action.date);
          
          // if events in the store are null, get events with the date from action
          if(!state){
            return of(getEvents({date: newDate}))
          }

          const currentYear = new Date(state).getFullYear();
          const currentMonth = new Date(state).getMonth();
          const newYear = newDate.getFullYear();
          const newMonth = newDate.getMonth();

          if (newMonth !== currentMonth || newYear !== currentYear) {
            return of(getEvents({date: newDate}))
          } else {
            if(storeEvents[`d${newDate.getDate()}`]){
              this.nodes.setDay(storeEvents[`d${newDate.getDate()}`])
            } else {
              this.nodes.setDay([])
            }
            return of(
              actuallySelectDate({ date: newDate, data: null }),
              changeTree()
            )
          }
        })
      )
    ); 

    getEvents$ = createEffect(() => 
      this.actions$.pipe(
        ofType(getEvents),
        exhaustMap((action: any) => 
          this.service.getEvents(action.date)
          .pipe(
            tap((info) => {
              if(info[`d${new Date(action.date).getDate()}`]){
                this.nodes.setDay(info[`d${new Date(action.date).getDate()}`])
              } else {
                this.nodes.setDay([])
              }
            }),
            switchMap(info => [
              actuallySelectDate({ date: action.date, data: info }),
              changeTree()
            ]),
            catchError(() => {
              return of(
                EventFailure({message: 'Couldn\'t access events'}),
                actuallySelectDate({ date: action.date, data: null }),
              )
            })
          )
        )
      )
    )


}