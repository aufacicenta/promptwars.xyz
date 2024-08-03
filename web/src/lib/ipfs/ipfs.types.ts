export type ContentOptions = {
  path?: string;
  name?: string;
  description?: string;
  owner?: string;
};

export type IpfsResponse = {
  cid: string;
  path: string;
  size: number;
  uri: string;
  name?: string;
};
