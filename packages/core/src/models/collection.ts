import { BaseTimeStampsPrototype } from "../shared/types";

export interface BaseCollectionNode {
  id: string;
  name: string;
}

export interface CollectionRequestNode extends BaseCollectionNode {
  type: "request";
  requestId: string;
}

export interface CollectionFolderNode extends BaseCollectionNode {
  type: "folder";
  children: CollectionNode[];
}

export type CollectionNode = CollectionFolderNode | CollectionRequestNode;

export interface Collection extends BaseTimeStampsPrototype {
  id: string;
  name: string;
  type: "collection";
  children: CollectionNode[];
}