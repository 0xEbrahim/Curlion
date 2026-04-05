import { BaseTimeStampsPrototype } from "../shared/types.js";
import { RequestType } from "./request.js";

export interface BaseCollectionChildren {
  id: string;
  name: string;
}

export interface CollectionRequestChildren extends BaseCollectionChildren {
  type: "request";
  request: RequestType;
}

export interface CollectionFolderChildren extends BaseCollectionChildren {
  type: "folder";
  children: CollectionSlot;
}

export type CollectionSlot =
  | CollectionFolderChildren
  | CollectionRequestChildren;

export interface Collection extends BaseTimeStampsPrototype {
  id: string;
  name: string;
  type: "collection";
  children: CollectionSlot;
}
