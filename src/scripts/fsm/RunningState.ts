import { IState, States } from "./types"
import { DoneState } from "./DoneState"

export class RunningState implements IState {
  readonly state: States = "Running"

  update() {
    return new DoneState()
  }
}
