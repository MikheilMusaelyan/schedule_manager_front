import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { EventService } from "./event.service";

@Injectable()

export class EventEffects$ {
    constructor(
        private actions$: Actions,
        private service: EventService
    ) {}

}