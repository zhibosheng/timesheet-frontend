import { rootReducer } from "..";

export type Severity = "error" | "success" | "info" | "warning" | undefined;

export type RootState = ReturnType<typeof rootReducer>