import ResponseError from "@/error/ResponseError";
import { ResponsePayload } from "@/types";

export async function fetchExcelFile(
  urlAPI: string,
  userId: string,
  placeHolderFileName: string,
) {
  const res = await fetch(urlAPI, {
    method: "GET",
    headers: {
      "x-user-id": userId,
    },
  });

  if (!res.ok) {
    const dataRes = (await res.json()) as ResponsePayload;

    throw new ResponseError(res.status, dataRes.message);
  }

  const disposition = res.headers.get("Content-Disposition");
  const fileName = disposition
    ? disposition.split("filename=")[1]
    : placeHolderFileName;
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
