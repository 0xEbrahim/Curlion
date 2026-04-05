export type RequestMethod = "get" | "post" | "put" | "patch" | "delete";

export type RequestHeader = {
  id: string;
  key: string;
  value: string;
  isEnabled: boolean;
};

export type RequestQueryParam = {
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

export interface RequestSchema {
  id: string;
  name: string;
  method: RequestMethod;
  headers: RequestHeader[];
  queryParam: RequestQueryParam;
  body: RequestBody;
  url: string;
}
