import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { enrichDocument, createDocument } from "../../api/documents";
import { alertFetchEndpoint } from "../alert/actions";
import { DocumentType } from "../../models/xml-builder";

export const createEnrichDocumentRequest = createAction(
  "document/enrich/request"
)();
export const createEnrichDocumentSuccess = createAction(
  "document/enrich/success"
)<any>();
export const createEnrichDocumentFailure = createAction(
  "document/enrich/failure"
)<AxiosError>();

export const createDocumentRequest = createAction("document/create/request")();
export const createDocumentSuccess = createAction("document/create/success")<
  any
>();
export const createDocumentFailure = createAction("document/create/failure")<
  AxiosError
>();

export const requestEnrichDocument = (
  documentType: DocumentType,
  document: any
) => {
  return (dispatch: Dispatch) => {
    dispatch(createEnrichDocumentRequest());
    return enrichDocument(documentType, document)
      .then((res: AxiosResponse<any>) => {
        dispatch(createEnrichDocumentSuccess(res.data));
        return res.data;
      })
      .catch((err: AxiosError) => {
        dispatch(createEnrichDocumentFailure(err));
        alertFetchEndpoint(err)(dispatch);
      });
  };
};

export const requestCreateDocument = (
  documentType: DocumentType,
  document: any
) => {
  return (dispatch: Dispatch) => {
    dispatch(createDocumentRequest());
    return createDocument(documentType, document)
      .then((res: AxiosResponse<any>) => {
        dispatch(createDocumentSuccess(res.data));
        return res;
      })
      .catch((err: AxiosError) => {
        dispatch(createDocumentFailure(err));
        alertFetchEndpoint(err)(dispatch);
      });
  };
};
