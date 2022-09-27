import { convertSpecToClientCode } from "./convertSpecToClientCode.ts";

/**
 * Returns client code for accessing the service defined by
 * the openapi specification at the given url.
 * @param url The url of an openapi specification.
 */
export async function convertRemoteSpecToClientCode(url: string) {
  const remoteServerResponse = await fetch(url);
  const openApiText = await remoteServerResponse.text();
  const clientCode = convertSpecToClientCode(openApiText);
  return clientCode;
}
