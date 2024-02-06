import React from 'react';


import Pumpkin from './fruit/Pumpkin';
import Annona from './fruit/Annona';
import Apricot from './fruit/Apricot';
import Artichoke from './fruit/Artichoke';
import Beetrrot from './fruit/Beetrrot';
import ButternutSquash from './fruit/ButternutSquash';
import Cauliflower from './fruit/Cauliflower';
import Chickpea from './fruit/Chickpea';
import Cotton from './fruit/Cotton';
import Dill from './fruit/Dill';
import Grapefruit from './fruit/Grapefruit';
import Gundelia from './fruit/Gundelia';
import Kumquat from './fruit/Kumquat';
import Loquat from './fruit/Loquat';
import Lychee from './fruit/Lychee';
import MasticTree from './fruit/MasticTree';
import Nectarine from './fruit/Nectarine';
import Papaya from './fruit/Papaya';
import PassionFruit from './fruit/PassionFruit';
import Pea from './fruit/Pea';
import Peach from './fruit/Peach';
import Peanut from './fruit/Peanut';
import Pecan from './fruit/Pecan';
import Persimmon from './fruit/Persimmon';
import Plum from './fruit/Plum';
import Pomegranate from './fruit/Pomegranate';
import Radish from './fruit/Radish';
import Raspberry from './fruit/Raspberry';
import SmallRadish from './fruit/SmallRadish';
import Turnip from './fruit/Turnip';
import Blackberry from './fruit/Blackberry';
import Almond from './fruit/Almond';

import LogoLeaf from './LogoLeaf';
import { Box } from '@mui/material';

const iconStyle = {width: 40, height: 40};

const lightGreen  = '#45a15c';

const FRUITS = {
    kiwi: '🥝',
    banana: '🍌',
    avocado: '🥑',
    watermelon: '🍉',
    coconut: '🥥',
    wheat: '🌾',
    apple: '🍏',
    cherry: '🍒',
    strawberries: '🍓',
    berries: '🫐',
    tree: '🌳',
    flower: '🌼',
    orange: '🍊',
    citrus: '🍊',
    'organic citrus': '🍊',
    tomato: '🍅',
    grapes: '🍇',
    flowers: '🌼',
    waxflower:  '🌼',
    carrot: '🥕',
    potato: '🥔',
    // almond: '🍂',
    basil: '🌿',
    peanut: '🥜',
    peach: '🍑',
    onion: '🧅',
    olive: '🫒',
    melon: '🍈',
    mango: '🥭',
    garlic: '🧄',
    chili: '🌶️',
    eggplant: '🍆',
    pepper: '🫑',
    broccoli: '🥦',
    corn: '🌽',
    pineapple: '🍍',
    'pine apple': '🍍',
    mushroom: '🍄‍🟫',
    cucumber: '🥒',
    lemon: '🍋',
    sunflower: '🌻' ,
    general: '🌿',
    pear: '🍐' ,
    sweetpotato: '🍠',
    'sweet_potato': '🍠',
    lettece: '🥬'
}
//🌺 🌷 🏵️ 🌼 🍎 🫐
export function getFruitIcon(cropName, unit) {

    let name = cropName ? cropName.toLowerCase() : '';

    if(!name){
        return <LogoLeaf color='primary'/>;
    }

    if(FRUITS[name]){
        return <Box fontSize={30}> {FRUITS[name]}</Box>;
    }
    
    

    if (name === 'turnip') {
        return <Turnip style={iconStyle}/>
    }
    if (name === 'almond') {
        return <Almond style={{width: 60, height: 60}}/>
    }
    if (name === 'small radish') {
        return <SmallRadish style={iconStyle}/>
    }

    if (name === 'raspberry') {
        return <Raspberry style={iconStyle}/>
    }

    if (name === 'radish') {
        return <Radish style={iconStyle}/>
    }
    if (name === 'pomegranate') {
        return <Pomegranate style={iconStyle}/>
    }
    if (name === 'plum') {
        return <Plum style={iconStyle}/>
    }
    if (name === 'persimmon') {
        return <Persimmon style={iconStyle}/>
    }
    if (name === 'pecans') {
        return <Pecan style={iconStyle}/>
    }
    if (name === 'peanut') {
        return <Peanut style={iconStyle}/>
    }
    if (name === 'peach') {
        return <Peach style={iconStyle}/>
    }
    if (name === 'pea') {
        return <Pea style={iconStyle}/>
    }
    if (name === 'passion fruit') {
        return <PassionFruit style={iconStyle}/>
    }
    if (name === 'papaya') {
        return <Papaya style={iconStyle}/>
    }

    if (name === 'nectarine') {
        return <Nectarine style={iconStyle}/>
    }

    if (name === 'mastic tree') {
        return <MasticTree style={iconStyle}/>
    }

    if (name === 'lychee') {
        return <Lychee style={iconStyle}/>
    }
    if (name === 'loquat') {
        return <Loquat style={iconStyle}/>
    }
    if (name === 'kumquat') {
        return <Kumquat style={iconStyle}/>
    }
    if (name === 'gundelia') {
        return <Gundelia style={iconStyle}/>
    }
    if (name === 'grapefruit') {
        return <Grapefruit style={iconStyle}/>
    }

    if (name === 'dill') {
        return <Dill style={iconStyle}/>
    }
    if (name === 'cotton') {
        return <Cotton style={iconStyle}/>
    }

    if (name === 'chickpea') {
        return <Chickpea style={iconStyle}/>
    }

    if (name === 'cauliflower') {
        return <Cauliflower style={iconStyle}/>
    }
    if (name === 'butternut squash') {
        return <ButternutSquash style={iconStyle}/>
    }
    if (name === 'beetrrot') {
        return <Beetrrot style={iconStyle}/>
    }
    if (name === 'artichoke') {
        return <Artichoke style={iconStyle}/>
    }
    if (name === 'apricot') {
        return <Apricot style={iconStyle}/>
    }
    if (name === 'pumpkin') {
        return <Pumpkin />
    }

    if (name === 'annona') {
        return <Annona style={iconStyle}/>
    }

    if (name === 'leaf') {
        return  <LogoLeaf color='primary'/>;
    }
    if (name === 'berries') {
        return <Blackberry />;
    }
    
    return <Box fontSize={30}> {FRUITS['general']}</Box>;
}