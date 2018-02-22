import React from 'react';
import { FormattedMessage } from 'react-intl';

import TripDetail from './TripDetail.container'


export default function TripDetailPage(props) {
  const { match: { params : { id }}} = props;
  const userId = localStorage.getItem('user.id');

  return (
    <div>
      <TripDetail tripId={id} userId={userId} />
    </div>
  );
}