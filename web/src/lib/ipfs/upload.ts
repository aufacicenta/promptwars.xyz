import asHttpsURL from "./asHttpsURL";
import { IpfsResponse } from "./ipfs.types";

const projectId = process.env.INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;

if (!projectId || !projectSecret) {
  throw new Error("IPFS project ID or secret is not set in environment variables");
}

const Authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const upload = async (content: Buffer, name: string): Promise<IpfsResponse | null> => {
  try {
    const formData = new FormData();
    formData.append("file", new Blob([content]), name);

    const response = await fetch("https://ipfs.infura.io:5001/api/v0/add", {
      method: "POST",
      headers: {
        Authorization,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      cid: result.Hash,
      size: result.Size,
      path: result.Name,
      uri: `ipfs://${result.Hash}`,
      name,
    };
  } catch (error) {
    console.error(error);
    throw new Error("providers/ipfs/upload: failed to upload file");
  }
};

export const getFileAsIPFSUrl = async (url: string, headers?: HeadersInit): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const blob = await response.arrayBuffer();
    const fileName = url.split("/").pop();

    const ipfsResponse = await upload(Buffer.from(blob), fileName!);

    return asHttpsURL(ipfsResponse?.cid) || "";
  } catch (error) {
    console.log(error);

    throw new Error("providers/ipfs/getfileAsIPFsUrl: invalid file response");
  }
};

export default upload;
