import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import { getMasterDetailsStyle } from "../../utils/StyleUtils";
import { TopBackBar, TextField } from '../../components';
import GisSettings from './GisSettings';
import GisMap from './GisMap';
import geojsonArea from 'geojson-area';

import { isEmpty } from '../../utils/StringUtil';
import { updateGisPolygons } from '../../actions';

const useStyles = makeStyles(
    theme => getMasterDetailsStyle(theme, 1, 3));


const Gis = (props) => {
    const classes = useStyles();
    const { text, dir, history,
        getGisPolygons,
        getGisPolygonId,
        setGisPolygonId,
        getGisPolygonName,
        setGisPolygonName,
        gisPolygons,
        gisPolygonNameAttr,
        gisPolygonIdAttr,
        getGisPolygonAttributes,
        gisPolygonAttributes,
        mapApiKey,
        deleteGisData,
        user,
        googleMapKey, bingMapKey,
    } = props;

    const [refresh, setRefresh] = useState(false);

    const [showId, setShowId] = useState(false);

    const [showName, setShowName] = useState(false);

    const [polygonType, setPolygonType] = useState('base');

    const [filter, setFilter] = useState('');


    useEffect(() => {
        getGisPolygons();
        getGisPolygonId(polygonType);
        getGisPolygonName(polygonType);
        getGisPolygonAttributes(polygonType);
        return () => {
            console.log('will unmount');
        }
    }, []);

    useEffect(() => {
        if (refresh) {
            getGisPolygons();
            getGisPolygonId(polygonType);
            getGisPolygonName(polygonType);
            getGisPolygonAttributes(polygonType);
        }
        setRefresh(false)

    }, [refresh]);

    useEffect(() => {
            getGisPolygonId(polygonType);
            getGisPolygonName(polygonType);
            getGisPolygonAttributes(polygonType);

    }, [polygonType]);

    if (gisPolygons) {
        const noAreaPolygons = gisPolygons.filter(e => e.area == null);
        noAreaPolygons.forEach(e => {
            const ob = { type: "Polygon", coordinates: [JSON.parse(e.coordinates)] };
            try {
                let area = geojsonArea.geometry(ob)
                if (area !== null && area > 0) {
                    area = (area / 1000).toFixed(2)
                }
                e.area = area;
            } catch (e) {
                              

            }
        });
        updateGisPolygons(noAreaPolygons);
    }

    const displayPolygons = isEmpty(filter) ? gisPolygons.filter(e => e.type === polygonType) : gisPolygons.filter(e => e.type === polygonType).filter(e => e.name.includes(filter) || e.externalId.includes(filter));

    return (
        <div className={classes.backRoot}>
            <TopBackBar dir={dir} label={text.back} history={history} />
            <div className={classes.root}>
                <div className={classes.master}>
                    <GisSettings history={history} text={text}
                        setGisPolygonId={setGisPolygonId}
                        setGisPolygonName={setGisPolygonName}
                        gisPolygonNameAttr={gisPolygonNameAttr}
                        gisPolygonIdAttr={gisPolygonIdAttr}
                        gisPolygonAttributes={gisPolygonAttributes}
                        deleteGisData={deleteGisData}
                        gisPolygons={gisPolygons.filter(e => e.type === polygonType)}
                        refresh={() => setRefresh(true)}
                        showId={showId}
                        setShowId={setShowId}
                        showName={showName}
                        setShowName={setShowName}
                        polygonType={polygonType}
                        setPolygonType={setPolygonType}                         

                    />
                </div>
                <div className={classes.details}>
                    <TextField
                        width={'98%'}
                        value={filter}
                        onChange={e => setFilter(e.target.value) && setRefresh(true)}
                    />
                    {!refresh && <GisMap user={user} googleMapKey={googleMapKey} bingMapKey={bingMapKey} gisPolygons={displayPolygons}
                        showName={showName} showId={showId}
                    />}


                </div>
            </div>
        </div>
    )

}
export default Gis;
