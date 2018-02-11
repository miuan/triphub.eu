import React from 'react';
import { FormattedMessage } from 'react-intl';

import TripDetail from './TripDetail.container'


export default function TripDetailPage(props) {
  const { match: { params : { id }}} = props;
  
  return (
    <div>
      <TripDetail adsId={id} />
    </div>
  );
}