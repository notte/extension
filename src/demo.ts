const demo = require("./demo.scss");
import { subTitleType } from "subtitle";
// import { useStore, createStore } from "effector";

// export const subsStore = createStore<subTitleType[]>([]);

export interface Store<State> extends Unit<State> {
  reset(...triggers: Array<Unit<any>>): this;
  reset(triggers: Array<Unit<any>>): this;
  getState(): State;
  map<T>(fn: (state: State, lastState?: T) => T): Store<T>;
  map<T>(fn: (state: State, lastState: T) => T, firstState: T): Store<T>;
  on<E>(
    trigger: Unit<E>,
    reducer: (state: State, payload: E) => State | void
  ): this;
  on<E>(
    triggers: Unit<E>[],
    reducer: (state: State, payload: E) => State | void
  ): this;
  off(trigger: Unit<any>): this;
  subscribe(listener: Observer<State> | ((state: State) => any)): Subscription;
  updates: Event<State>;
  watch<E>(watcher: (state: State, payload: undefined) => any): Subscription;
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E) => any
  ): Subscription;
  thru<U>(fn: (store: Store<State>) => U): U;
  defaultState: State;
  compositeName: CompositeName;
  shortName: string;
  sid: string | null;
}

export interface Event<Payload> extends Unit<Payload> {
  (payload: Payload): Payload;
  (
    this: Payload extends void ? void : `Error: Expected 1 argument, but got 0`,
    payload?: Payload
  ): void;
  watch(watcher: (payload: Payload) => any): Subscription;
  map<T>(fn: (payload: Payload) => T): EventAsReturnType<T>;
  filter<T extends Payload>(config: {
    fn(payload: Payload): payload is T;
  }): EventAsReturnType<T>;
  filter(config: { fn(payload: Payload): boolean }): EventAsReturnType<Payload>;
  filterMap<T>(fn: (payload: Payload) => T | undefined): EventAsReturnType<T>;
  prepend<Before = void>(fn: (_: Before) => Payload): Event<Before>;
  subscribe(observer: Observer<Payload>): Subscription;
  thru<U>(fn: (event: Event<Payload>) => U): U;
  getType(): string;
  compositeName: CompositeName;
  sid: string | null;
  shortName: string;
}
type EventAsReturnType<Payload> = any extends Payload ? Event<Payload> : never;

export interface Unit<T> {
  readonly kind: kind;
  readonly __: T;
}

export type Observer<A> = {
  readonly next?: (value: A) => void;
  //error(err: Error): void
  //complete(): void
};
export type Subscription = {
  (): void;
  unsubscribe(): void;
};
export type CompositeName = {
  shortName: string;
  fullName: string;
  path: Array<string>;
};

export type kind = "store" | "event" | "effect" | "domain";

// export function createStore<State>(
//     defaultState: State,
//     config?: {
//       name?: string;
//       sid?: string
//       updateFilter?: (update: State, current: State) => boolean
//     },
//   ): Store<State>
// export function useStore<State>(store: Store<State>): State

setTimeout(() => {
  const video: HTMLVideoElement | null = document.querySelector("video");
  if (video) {
    // console.log(video.currentTime);
    console.log(video.dataset);
  }
}, 3000);

// const subs = useStore(subsStore);
// console.log(subs);
// var p = document.createElement("h1");
// p.textContent = "This paragraph was added by a page script.";
// p.setAttribute("id", "page-script-para");
// document.body.appendChild(p);

export {};
