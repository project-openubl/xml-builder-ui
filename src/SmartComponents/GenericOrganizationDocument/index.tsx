import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GenericOrganizationDocument from "./GenericOrganizationDocument";
import { organizationDocumentActions } from "../../store/organizationDocument";
import { createMapStateToProps } from "../../store/common";

const mapStateToProps = createMapStateToProps(state => ({}));

const mapDispatchToProps = {
  requestEnrichOrganizationDocument: organizationDocumentActions.requestEnrichOrganizationDocument,
  requestCreateOrganizationDocument: organizationDocumentActions.requestCreateOrganizationDocument
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GenericOrganizationDocument)
);
