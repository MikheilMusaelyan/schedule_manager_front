import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { addEvent, addEventSuccess, EventFailure, changeTree, moveEventSuccess, changeEvent, deleteEvent, getEvents, getEventsSuccess } from "src/app/event/event.actions";
import { Store, select } from "@ngrx/store";
import * as nodes from 'src/app/shared/nodes'
import { EventService } from "../event/event.service";
import { selectDate } from "./calendar.actions";
import { selectToday } from "./calendar.selectors";
import { EventState } from "../event/reducers";
import { CalendarState } from "./reducers/calendar.reducer";

@Injectable()

export class CalendarEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService,
        private store: Store<CalendarState>
    ) {}
    prevDate: Date = new Date();
    
    // addEvent$ = createEffect(() =>
    //     this.actions$.pipe(
    //       ofType(selectDate),
    //       map((action: any) => {
    
    //         const sentMonth = new Date(action.date).getMonth()
    //         const sentYear = new Date(action.date).getFullYear()
            
    //         if(new Date(this.prevDate).getMonth() != sentMonth || (new Date(this.prevDate).getFullYear() != sentYear)){
    //             console.log('get fucking events', action)
    //             getEvents({day: new Date(action.date)})
    //         }
            
    //         this.prevDate = new Date(JSON.parse(JSON.stringify(action.date)))
    //       })
    //     ), {dispatch: false}
    // );
}