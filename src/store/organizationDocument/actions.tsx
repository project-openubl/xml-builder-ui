import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { createAction } from "typesafe-actions";
import { enrichOrganizationDocument, createOrganizationDocument } from "../../api/organizations";
import { alertFetchEndpoint } from "../alert/actions";
import { DocumentType } from "../../models/xml-builder";

interface OrganizationDocumentActionMeta {
  organizationId: string;
}

export const createEnrichOrganizationDocumentRequest = createAction(
  "organization/document/enrich/request"
)<OrganizationDocumentActionMeta>();
export const createEnrichOrganizationDocumentSuccess = createAction(
  "organization/document/enrich/success"
)<any, OrganizationDocumentActionMeta>();
export const createEnrichOrganizationDocumentFailure = createAction(
  "organization/document/enrich/failure"
)<AxiosError, OrganizationDocumentActionMeta>();

export const createOrganizationDocumentRequest = createAction(
  "organization/document/create/request"
)<OrganizationDocumentActionMeta>();
export const createOrganizationDocumentSuccess = createAction(
  "organization/document/create/success"
)<any, OrganizationDocumentActionMeta>();
export const createOrganizationDocumentFailure = createAction(
  "organization/document/create/failure"
)<AxiosError, OrganizationDocumentActionMeta>();

export const requestEnrichOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
) => {
  return (dispatch: Dispatch) => {
    const meta: OrganizationDocumentActionMeta = {
      organizationId: organizationId
    };

    dispatch(createEnrichOrganizationDocumentRequest(meta));
    return enrichOrganizationDocument(organizationId, documentType, document)
      .then((res: AxiosResponse<any>) => {
        dispatch(createEnrichOrganizationDocumentSuccess(res.data, meta));
        return res.data;
      })
      .catch((err: AxiosError) => {
        dispatch(createEnrichOrganizationDocumentFailure(err, meta));
        alertFetchEndpoint(err)(dispatch);
      });
  };
};

export const requestCreateOrganizationDocument = (
  organizationId: string,
  documentType: DocumentType,
  document: any
) => {
  return (dispatch: Dispatch) => {
    const meta: OrganizationDocumentActionMeta = {
      organizationId: organizationId
    };

    dispatch(createOrganizationDocumentRequest(meta));
    return createOrganizationDocument(organizationId, documentType, document)
      .then((res: AxiosResponse<any>) => {
        dispatch(createOrganizationDocumentSuccess(res.data, meta));
        return res;
      })
      .catch((err: AxiosError) => {
        dispatch(createOrganizationDocumentFailure(err, meta));
        alertFetchEndpoint(err)(dispatch);
      });
  };
};
