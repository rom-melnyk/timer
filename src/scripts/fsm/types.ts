export type States = "Idle" | "Running" | "Done"

export interface IState {
  state: States
  update(): IState
}
