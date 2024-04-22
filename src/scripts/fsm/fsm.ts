import { ref } from "vue"
import type { IState } from "./types"
import { IdleState } from "./IdleState"

export const state = ref<IState>(new IdleState())
