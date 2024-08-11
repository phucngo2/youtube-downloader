import { Worker } from "node:worker_threads";

export interface WorkersMapValue {
  worker: Worker;
  savePath: string;
}
export type IWorkersMap = Map<string, WorkersMapValue>;
