import { IState, States } from "./types"
import { IdleState } from "./IdleState"

export class DoneState implements IState {
  readonly state: States = "Done"

  update() {
    return new IdleState()
  }
}
