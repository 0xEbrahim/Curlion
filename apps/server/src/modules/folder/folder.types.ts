export interface FolderResponse {
  id: string;
  name: string;
  collectionId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderCollectionParam {
  collectionId: string;
}

export interface FolderParams {
  collectionId: string;
  folderId: string;
}
