import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { organizationDocumentActions } from "../../store/organizationDocument";
import { createMapStateToProps } from "../../store/common";
import DocumentCreate from "./DocumentCreate";

const mapStateToProps = createMapStateToProps(state => ({}));

const mapDispatchToProps = {
  requestEnrichOrganizationDocument:
    organizationDocumentActions.requestEnrichOrganizationDocument,
  requestCreateOrganizationDocument:
    organizationDocumentActions.requestCreateOrganizationDocument
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocumentCreate)
);
