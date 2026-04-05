import { BaseTimeStampsPrototype } from "../../shared/types/types.js";

export type RequestMethod = "get" | "post" | "put" | "patch" | "delete";

export type KeyValueEntry = {
  id: string;
  key: string;
  value: string;
  isEnabled: boolean;
};

export type RequestBodyType =
  | "none"
  | "json"
  | "text"
  | "form-urlencoded"
  | "multipart-form-data";

export type RequestBody =
  | { type: "none" }
  | { type: "json"; content: string }
  | { type: "text"; content: string }
  | {
      type: "form-urlencoded";
      entries: Array<{
        id: string;
        key: string;
        value: string;
        enabled: boolean;
      }>;
    }
  | {
      type: "multipart-form-data";
      entries: Array<{
        id: string;
        key: string;
        value: string;
        enabled: boolean;
      }>;
    };

export interface RequestType extends BaseTimeStampsPrototype {
  id: string;
  name: string;
  collection: string;
  method: RequestMethod;
  headers: KeyValueEntry[];
  queryParam: KeyValueEntry[];
  body: RequestBody;
  url: string;
}
