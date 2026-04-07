export type RequestMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export interface KeyValueEntry {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export type RequestBody =
  | { type: 'none' }
  | { type: 'json'; content: string }
  | { type: 'text'; content: string }
  | { type: 'form-urlencoded'; entries: KeyValueEntry[] }
  | { type: 'multipart-form-data'; entries: KeyValueEntry[] };

export interface RequestResponse {
  id: string;
  name: string;
  collectionId: string;
  folderId: string | null;
  method: RequestMethod;
  url: string;
  headers: KeyValueEntry[];
  queryParams: KeyValueEntry[];
  body: RequestBody;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestIdParam {
  requestId: string;
}
