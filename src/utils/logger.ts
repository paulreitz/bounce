import { Subject, interval } from "rxjs";
import { throttle } from "rxjs/operators";

export class Logger {
    private static _instance: Logger;

    private _message$ = new Subject<string>();
    private throttleMS = 500;

    private constructor() {
        this._message$.pipe(throttle(() => interval(this.throttleMS))).subscribe(message => {
            console.log(message);
        });
    }

    public static get instance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }

        return Logger._instance;
    }

    public log(message: string): void {
        this._message$.next(message);
    }
}