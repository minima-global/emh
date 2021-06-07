import {useEffect} from 'react';
import {connect} from 'react-redux';

import { useBeforeunload } from 'react-beforeunload';

import {init, close} from '../store/app/EMH/actions';

import {ApplicationState, AppDispatch} from '../store/types';

interface InitDispatchProps {
  init: () => void
  close: () => void
}

type Props = InitDispatchProps

const initialise = ( props: Props ) => {
  useEffect(() => {
    props.init();
  }, []);

  useBeforeunload(() => props.close());

  return null;
};

const mapDispatchToProps = (dispatch: AppDispatch): InitDispatchProps => {
  return {
    init: () => dispatch(init()),
    close: () => dispatch(close())
  };
};

export const AppInitandClose = connect<{}, InitDispatchProps, {}, ApplicationState>(
    null,
    mapDispatchToProps,
)(initialise);
