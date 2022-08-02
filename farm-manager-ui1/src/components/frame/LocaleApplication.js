import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { BrowserRouter, Route } from 'react-router-dom'
import { AppFrame } from '..';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import heLocale from 'date-fns/locale/he';
import esLocale from 'date-fns/locale/es';
import enLocale from 'date-fns/locale/en-GB';
import ptLocale from 'date-fns/locale/pt';
import nlLocale from 'date-fns/locale/nl';
import frLocale from 'date-fns/locale/fr';



const localeMap = {
    en: enLocale,
    he: heLocale,
    es: esLocale,
    pt: ptLocale,
    nl: nlLocale,
    fr: frLocale,
};

function getFnsLocale(lang) {
    const result = localeMap[lang];
    if (result) {
        return result;
    }

    return enLocale; // default
}

const LocaleApplication = (props) => {

    const { dir, authenticated, lang } = props;
    const [cacheRtl, setCacheRtl] = useState(null);
    const [fnsLocaleValue, setFnsLocaleValue] = useState(getFnsLocale(lang));

    useEffect(() => {
        if (dir === 'rtl') {
            setCacheRtl(createCache({
                key: 'muirtl',
                stylisPlugins: [rtlPlugin],
            }));
        } else {
            setCacheRtl(null);
        }
    }, [dir]);


    useEffect(() => {
        setFnsLocaleValue(getFnsLocale(lang))
    }, [lang]);



    if (cacheRtl) {
        return (
            <CacheProvider value={cacheRtl}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fnsLocaleValue}>
                    <BrowserRouter>
                        <Route path="/" render={routeProps => (<AppFrame authenticated={authenticated} {...routeProps} {...props} />)} />
                    </BrowserRouter>
                </LocalizationProvider>
            </CacheProvider>
        )
    } else {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fnsLocaleValue}>
                <BrowserRouter>
                    <Route path="/" render={routeProps => (<AppFrame authenticated={authenticated} {...routeProps} {...props} />)} />
                </BrowserRouter>
            </LocalizationProvider>
        )
    }


}
export default LocaleApplication;



