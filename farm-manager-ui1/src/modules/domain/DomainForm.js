import React, { useState, useEffect } from 'react';


import {  Loading,  } from '../../components/core';

import { withRouter } from 'react-router-dom'
import { loadDataByName } from "../../utils/LoadUtil";
import {  newDate } from "../../utils/DateUtil";
import DomainFormBase from './DomainFormBase'



const DomainForm = (props) => {

    const { match, selectDomain, getDomain, getGisPolygons, fields,
        selectedDomain,
    } = props;

    useEffect(() => {
        loadDataByName(props, ['varieties', 'fields', 'fieldInPolygonOptions', 'tags', 'productCategories', 'crops']);
        getGisPolygons();

        if (match.params.id) {
            selectDomain(null);
            const id = Number(match.params.id);
            if (id === 0) {
                selectDomain({
                    plant: newDate(),
                    active: true,
                    plantArea: 0,
                    color: 'gray',
                    editable: true
                });
            }
            else {
                getDomain(match.params.id);
            }
        }
        else if (match.params.fieldId) {
            const found = fields.filter(f => f.id = match.params.fieldId);
            if (found.length > 0) {
                const row = found[0];
                selectDomain({
                    field: row,
                    plant: newDate(),
                    active: true,
                    plantArea: row.size,
                    polygon: row.polygon,
                    lng: row.lng,
                    lat: row.lat,
                    color: 'gray',
                    zoom: row.zoom,
                    editable: true
                });
            }
        }

        return () => {
            selectDomain(null);
        }

    }, [])



    if (selectedDomain && fields.length !== 0) {
        return <DomainFormBase initialValues={selectedDomain} {...props} />
    } else {
        return (
            <Loading />
        )
    }
}

export default withRouter(DomainForm);
