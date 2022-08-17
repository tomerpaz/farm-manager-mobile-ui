import React from 'react';
import EN from './EN';
import HE from './HE';
import Water from './Water'
import ExcelIcon from './ExcelIcon'
import PdfIcon from './PdfIcon'
import Logo from './Logo'
import LeafLogo from './LeafLogo'
import Calculator from './Calculator'
import ES from './ES';
import NL from './NL';
import PT from './PT';


export function getIcon(name) {

    if(name === 'he'){
        return <HE />
    }
    if(name === 'en'){
        return <EN />
    }
    if(name === 'es'){
        return <ES />
    }
    if(name === 'nl'){
        return <NL />
    }
    if(name === 'pt'){
        return <PT />
    }
    if(name === 'water'){
        return <Water />
    }
    if(name === 'pdf'){
        return <PdfIcon />
    }
    if(name === 'xls'){
        return <ExcelIcon />
    }
    if(name === 'logo') {
        return <LeafLogo/>
    }
    if(name === 'calculator') {
        return <Calculator/>
    }
}