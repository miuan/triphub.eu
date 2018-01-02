import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import { openNewPlaceModal } from './actions';
import { makeSelectOpenNewPlaceModal } from './selectors';
import reducer from './reducer';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class DialogExampleDialogDatePicker extends React.Component {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  componentWillReceiveProps = (nextProps) => {
    // this.setState({open: nextProps.open});
  }

  render() {
    const { open, onCreateNewPlace, onClose } = this.props;

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={onClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog With Date Picker" onClick={this.onCreateNewPlace} />
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onClose}
        >
          Open a Date Picker dialog from within a dialog.
          <DatePicker hintText="Date Picker" />
        </Dialog>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch , props) {
  return {
    onChangePlace: (city_name) => {
      const { allCities : { allCities, refetch, loading } } = props;
      
      console.log('onChangePlace', props);
      // refetch({ name : city_name})
      // dispatch(placesRequest(city_name))
    },onCreateNewPlace : (open) => {
      console.log('onCreateNewPlace', open)
      dispatch(openNewPlaceModal(true))
    },onClose : (open) => {
      console.log('onClose', open)
      dispatch(openNewPlaceModal(false))
    }
  };
}

const mapStateToProps = createStructuredSelector({
  open : makeSelectOpenNewPlaceModal(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'adseditor', reducer });

const AdsEditorContainer = compose(
  withReducer,
  withConnect,
)(DialogExampleDialogDatePicker);

export default AdsEditorContainer;