import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import { organizationContextSelectors, organizationContextActions } from "../../store/organizationContext";
import OrganizationContextSelector from "./OrganizationContextSelector";

const mapStateToProps = createMapStateToProps(state => ({
  ctxOrganization:
    organizationContextSelectors.selectedOrganization(state) || null,
  ctxOrganizations: organizationContextSelectors.organizations(state) || []
}));

const mapDispatchToProps = {
  selectCtxOrganization: organizationContextActions.selectOrganizationContext
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContextSelector);
