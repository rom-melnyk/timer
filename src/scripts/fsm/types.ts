import type { Ref } from "vue"

export type States = "Idle" | "Running" | "Done"

export interface IState {
  state: States
  update(context: { state?: Ref<IState>, /* timer: Timer */ } = {}): IState
}
