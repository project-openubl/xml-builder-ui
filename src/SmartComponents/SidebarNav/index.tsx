import { connect } from "react-redux";
import { SidebarNav } from "./SidebarNav";
import { createMapStateToProps } from "../../store/common";
import { organizationContextSelectors } from "../../store/organizationContext";

const mapStateToProps = createMapStateToProps(state => ({
  ctxOrganizations: organizationContextSelectors.organizations(state) || [],
  ctxOrganization: organizationContextSelectors.selectedOrganization(state) || null
}));

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav);
