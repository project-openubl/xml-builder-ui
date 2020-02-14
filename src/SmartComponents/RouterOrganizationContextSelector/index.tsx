import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createMapStateToProps } from "../../store/common";
import {
  organizationContextSelectors,
  organizationContextActions
} from "../../store/organizationContext";
import RouterOrganizationContextSelector from "./OrganizationContextLoader";

const mapStateToProps = createMapStateToProps(state => ({
  ctxOrganization: organizationContextSelectors.selectedOrganization(state) || null,
  ctxOrganizations: organizationContextSelectors.organizations(state) || []
}));

const mapDispatchToProps = {
  selectCtxOrganization: organizationContextActions.selectOrganizationContext
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RouterOrganizationContextSelector)
);
