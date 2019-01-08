import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Startup from '../components/Startup/Startup';
import * as TodoActionCreators from '../actions/mainActions';
import * as actionTypes from '../Store/constant';

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    const user = bindActionCreators(TodoActionCreators, dispatch);
    return {
        onLogin: (data) => {
            // console.log('realAuth;;;>', data);
            dispatch(push('/loggedin'));
            dispatch({
                type: actionTypes.USER_LOGIN,
                payload: data,
            });
        },
        onRegister: () => {
            dispatch(push('/Registration'));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Startup);
