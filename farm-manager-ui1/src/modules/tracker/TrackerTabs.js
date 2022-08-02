import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import UnitTracker from './UnitTracker';



export function isTracker(user) {
    return user.business.wialon === 2;
    // return false;
}

const TrackerTabs = (props) => {
    // const { history, text, match: { params: { subTab } }, user, wialonGetUnits, domains, yearFilter, getDomainsByYear } = props;
    return (
        // <div className={classes.root}>
            <UnitTracker {...props} />
        // </div>
    );
}

export default withRouter(TrackerTabs);
