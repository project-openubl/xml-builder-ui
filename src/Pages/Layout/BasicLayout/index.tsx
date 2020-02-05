import BasicLayout from "./BasicLayout";
import { connect } from "react-redux";
import { createMapStateToProps } from "../../../store/common";
import { organizationContextSelectors } from "../../../store/organizationContext";

const mapStateToProps = createMapStateToProps(state => ({
  contextOrganizations: organizationContextSelectors.organizations(state) || [],
  selectedContextOrganization: organizationContextSelectors.selectedOrganization(state) || null
}));

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
