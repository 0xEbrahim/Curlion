export interface CollectionResponse {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionIdParam {
  collectionId: string;
}
