import {useEffect} from 'react';
import {connect} from 'react-redux';

import {init} from '../store/app/blockchain/actions';

import {ApplicationState, AppDispatch} from '../store/types';

interface InitDispatchProps {
  init: () => void
}

type Props = InitDispatchProps

const initialise = ( props: Props ) => {
  useEffect(() => {
    props.init();
  }, []);

  return null;
};

const mapDispatchToProps = (dispatch: AppDispatch): InitDispatchProps => {
  return {
    init: () => dispatch(init()),
  };
};

export const AppInit = connect<{}, InitDispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(initialise);
