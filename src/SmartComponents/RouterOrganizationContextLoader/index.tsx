import { connect } from "react-redux";
import { createMapStateToProps } from "../../store/common";
import {
  organizationContextSelectors,
  organizationContextActions
} from "../../store/organizationContext";
import RouterOrganizationContextLoader from "./OrganizationContextLoader";

const mapStateToProps = createMapStateToProps(state => ({
  cxtOrganizationsError: organizationContextSelectors.error(state),
  cxtOrganizationsStatus: organizationContextSelectors.status(state)
}));

const mapDispatchToProps = {
  fetchCtxOrganizations: organizationContextActions.fetchOrganizations
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterOrganizationContextLoader);
