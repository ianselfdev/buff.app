import { connect } from 'react-redux';
import ApBarDashboard from '../components/ApBarDashboard/AppBarDashboard';
import { bindActionCreators } from 'redux';
import * as mainActions from '../actions/mainActions';
// console.log('TodoActionCreators',mainActions);
const mapStateToProps = (state, ownProps) => ({
    allHistory: state.reducerMain.allHistory,
    username: state.reducerMain.username,
    ownProps: ownProps,
    tournaments: state.reducerMain.allTournaments,
    address: state.reducerMain.address,
    token: state.reducerMain.token
});

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(mainActions, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ApBarDashboard);
