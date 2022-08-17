import React from 'react';
import Apple from './fruit/Apple';
import Avocado from './fruit/Avocado';
//import Beetroot from './fruit/beetroot.svg';

import Potato from './fruit/Potato';
import Banana from './fruit/Banana';
import Pepper from './fruit/Pepper';
import Grapes from './fruit/Grapes';
import Orange from './fruit/Orange';
import Corn from './fruit/Corn';

import Pineapple from './fruit/Pineapple';
import Pumpkin from './fruit/Pumpkin';
import Strawberries from './fruit/Strawberries';
import Tomato from './fruit/Tomato';
import Watermelon from './fruit/Watermelon';

import Pear from './fruit/Pear';
import Mushroom from './fruit/Mushroom';
import Lemon from './fruit/Lemon';
import Cucumber from './fruit/Cucumber';
import Carrot from './fruit/Carrot';
import Broccoli from './fruit/Broccoli';
import Eggplant from './fruit/Eggplant';
import Tree from './fruit/Tree';
import Flower from './fruit/Flower';
import Almond from './fruit/Almond';
import Annona from './fruit/Annona';
import Apricot from './fruit/Apricot';
import Artichoke from './fruit/Artichoke';
import Asparagus from './fruit/Asparagus';
import Beetrrot from './fruit/Beetrrot';
import ButternutSquash from './fruit/ButternutSquash';
import Cabbage from './fruit/Cabbage';
import Cauliflower from './fruit/Cauliflower';
import Cherry from './fruit/Cherry';
import Chickpea from './fruit/Chickpea';
import Chili from './fruit/Chili';
import Cotton from './fruit/Cotton';
import Dill from './fruit/Dill';
import Garlic from './fruit/Garlic';
import Grapefruit from './fruit/Grapefruit';
import Gundelia from './fruit/Gundelia';
import Kumquat from './fruit/Kumquat';
import Lettece from './fruit/Lettece';
import Loquat from './fruit/Loquat';
import Lychee from './fruit/Lychee';
import Mango from './fruit/Mango';
import MasticTree from './fruit/MasticTree';
import Melon from './fruit/Melon';
import Nectarine from './fruit/Nectarine';
import Olive from './fruit/Olive';
import Onion from './fruit/Onion';
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
import Sunflower from './fruit/Sunflower';
import SweetPotato from './fruit/SweetPotato';
import Turnip from './fruit/Turnip';
import Wheat from './fruit/Wheat';
import Blackberry from './fruit/Blackberry';
import LogoLeaf from './LogoLeaf';

const iconStyle = {width: 40, height: 40};

const lightGreen  = '#45a15c';

export function getFruitIcon(cropName, unit) {

    let name = cropName ? cropName.toLowerCase() : '';

    if(!name){
        return <LogoLeaf color='primary'/>;
    }
    if (name === 'turnip') {
        return <Turnip style={iconStyle}/>
    }
    if (name === 'wheat') {
        return <Wheat style={iconStyle}/>
    }
    if (name === 'sweet potato') {
        return <SweetPotato style={iconStyle}/>
    }

    if (name === 'sunflower') {
        return <Sunflower style={iconStyle}/>
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
    if (name === 'onion') {
        return <Onion style={iconStyle}/>
    }
    if (name === 'olive') {
        return <Olive style={iconStyle}/>
    }
    if (name === 'nectarine') {
        return <Nectarine style={iconStyle}/>
    }
    if (name === 'melon') {
        return <Melon style={iconStyle}/>
    }
    if (name === 'mastic tree') {
        return <MasticTree style={iconStyle}/>
    }
    if (name === 'mango') {
        return <Mango style={iconStyle}/>
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
    if (name === 'lettece') {
        return <Lettece style={iconStyle}/>
    }
    if (name === 'gundelia') {
        return <Gundelia style={iconStyle}/>
    }
    if (name === 'grapefruit') {
        return <Grapefruit style={iconStyle}/>
    }
    if (name === 'garlic') {
        return <Garlic style={iconStyle}/>
    }
    if (name === 'dill') {
        return <Dill style={iconStyle}/>
    }
    if (name === 'cotton') {
        return <Cotton style={iconStyle}/>
    }
    if (name === 'chili') {
        return <Chili style={iconStyle}/>
    }
    if (name === 'chickpea') {
        return <Chickpea style={iconStyle}/>
    }
    if (name === 'cherry') {
        return <Cherry style={iconStyle}/>
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
    if (name === 'apple') {
        return <Apple />
    }
    if (name === 'eggplant') {
        return <Eggplant />
    }
    if (name === 'avocado') {
        return <Avocado />
    }
    if (name === 'banana') {
        return <Banana />
    }
    //if(name === 'beetroot'){
    //    return <Beetroot />
    //}
    if (name === 'pepper') {
        return <Pepper />
    }
    //if(name === 'PepperYellow'){
    //    return <PepperYellow />
    //}
    if (name === 'Broccoli') {
        return <Broccoli />
    }
    if (name === 'potato') {
        return <Potato />
    }
    if (name === 'banana') {
        return <Banana />
    }
    if (name === 'grapes') {
        return <Grapes />
    }
    if (name === 'orange' || name.includes('citrus')) {
        return <Orange />
    }
    if (name === 'corn') {
        return <Corn />
    }
    if (name === 'pine apple') {
        return <Pineapple />
    }
    if (name === 'corn') {
        return <Corn />
    }
    if (name === 'pumpkin') {
        return <Pumpkin />
    }
    if (name === 'strawberries') {
        return <Strawberries />
    }
    if (name === 'watermelon') {
        return <Watermelon />
    }
    if (name === 'tomato') {
        return <Tomato />
    }
    if (name === 'pear') {
        return <Pear />
    }
    if (name === 'mushroom') {
        return <Mushroom />
    }
    if (name === 'cucumber') {
        return <Cucumber />
    }
    if (name === 'carrot') {
        return <Carrot />
    }
    if (name === 'broccoli') {
        return <Broccoli />
    }
    if (name === 'eggplant') {
        return <Eggplant />
    }

    if (name === 'almond') {
        return <Almond style={iconStyle}/>
    }

    if (name === 'annona') {
        return <Annona style={iconStyle}/>
    }

    if (name.includes('flower')) {
        return <Flower />;
    }
    if (name.includes('tree')) {
        return <Tree />;
    }
    if (name === 'leaf') {
        return  <LogoLeaf color='primary'/>;
    }
    if (name === 'berries') {
        return <Blackberry />;
    }
    
    return <Tree />
}