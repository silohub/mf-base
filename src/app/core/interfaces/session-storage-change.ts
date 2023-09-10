import { Account } from "./account";

export interface SessionStorageChange {
  oldValue: Account | null;
  newValue: Account | null;
}
