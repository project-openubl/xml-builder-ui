import { AxiosPromise } from "axios";
import ApiClient from "./apiClient";
import { DocumentType } from "../models/xml-builder";

const ENRICH_DOCUMENTS_URL = "/documents/{documentType}/enrich";
const CREATE_DOCUMENTS_URL = "/documents/{documentType}/create";

export const enrichDocument = (
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    ENRICH_DOCUMENTS_URL.replace("{documentType}", documentType),
    document
  );
};

export const createDocument = (
  documentType: DocumentType,
  document: any
): AxiosPromise<any> => {
  return ApiClient.post<any>(
    CREATE_DOCUMENTS_URL.replace("{documentType}", documentType),
    document
  );
};
