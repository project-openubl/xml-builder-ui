import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProviderManagerModal from "./ProviderManagerModal";
import { createMapStateToProps } from "../../store/common";
import { componentActions } from "../../store/organizationComponent";

const mapStateToProps = createMapStateToProps(state => ({}));

const mapDispatchToProps = {
  requestCreateComponent: componentActions.requestCreateComponent,
  requestUpdateComponent: componentActions.requestUpdateComponent
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProviderManagerModal)
);
