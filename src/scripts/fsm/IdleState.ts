import { IState, States } from "./types"
import { RunningState } from "./RunningState"

export class IdleState implements IState {
  readonly state: States = "Idle"

  update() {
    return new RunningState()
  }
}
