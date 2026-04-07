import { BaseTimeStampsPrototype } from "../shared/types";

export type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export type KeyValueEntry = {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
};

export type RequestBody =
  | { type: "none" }
  | { type: "json"; content: string }
  | { type: "text"; content: string }
  | { type: "form-urlencoded"; entries: KeyValueEntry[] }
  | { type: "multipart-form-data"; entries: KeyValueEntry[] };

export interface RequestType extends BaseTimeStampsPrototype {
  id: string;
  name: string;
  collectionId: string;
  method: RequestMethod;
  headers: KeyValueEntry[];
  queryParams: KeyValueEntry[];
  body: RequestBody;
  url: string;
}
