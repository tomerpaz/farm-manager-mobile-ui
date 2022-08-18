import React from 'react';


const p1 = [
    { color: '#F1F8E9',  label: '0'},
    { color: '#DCEDC8',  label: '0.1'},
    { color: '#C5E1A5',  label: '0.2'},
    { color: '#AED581',  label: '0.3' },
    { color: '#9CCC65',  label: '0.4' },
    { color: '#8BC34A',  label: '0.5' },
    { color: '#2E7D32',  label: '0.6' ,textColor: '#FAFAFA',},
    { color: '#1B5E20',  label: '0.7',textColor: '#FAFAFA', },
    { color: '#1B5E20',  label: '' },
    { color: '#1B5E20',  label: '' },
    { color: '#1B5E20',  label: '1',textColor: '#FAFAFA', },
];

const p2 = [
   
    { color: '#212121', textColor: '#FAFAFA', label: '-1' },
    { color: '#424242',  label: '' },
    { color: '#616161', label: '' },
    { color: '#757575', label: '' },
    { color: '#9E9E9E', label: ' '},
    { color: '#BDBDBD',  label: '' },
    { color: '#E0E0E0',  label: '' },
    { color: '#EEEEEE',  label: '' },
    { color: '#F5F5F5',  label: '' },
    { color: '#FAFAFA',  label: '1' },
];
//(0, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,               0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1)
const p3 = [

    { color: '#d7d7d7ff',  label: '0'},
    { color: '#d7d7d7ff',  label: ''},
    { color: '#d7d7d7ff',  label: '0.25'},
    { color: '#a22211ff',  label: '0.3' },
    { color: '#ed2909ff',  label: '0.35' },
    { color: '#f8840aff',  label: '0.4' },
    { color: '#fcc201ff',  label: '0.45' },
    { color: '#f9eb06ff',  label: '0.5' },
    { color: '#c9db06ff',  label: '0.55' },
    { color: '#94c805ff',  label: '0.6' },
    { color: '#7abb05ff',  label: '0.65' },
    { color: '#6cb006ff',  label: '0.7' },
    { color: '#5da604ff',  label: '0.75' },
    { color: '#4f9b04ff',  label: '0.8' },
    { color: '#428f05ff',  label: '0.85' },
    { color: '#338504ff',  label: '0.9',textColor: '#FAFAFA', },
    { color: '#237a00ff',  label: '0.95' ,textColor: '#FAFAFA',},
    { color: '#156e00ff',  label: '1' ,textColor: '#FAFAFA',},
];
const p4 = [//0, 0.07, 0.15, 0.23, 0.3, 0.37, 0.45, 0.51, 0.58, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1
    { color: '#d7d7d7ff',  label: '0' },
    { color: '#d7d7d7ff',  label: '0.07' },
    { color: '#ef2e14ff', textColor: "", label: '0.15' },
    { color: '#ed2909ff',  label: '0.23' },
    { color: '#f8840aff',  label: '0.3' },
    { color: '#fcc201ff',  label: '0.37' },
    { color: '#f9eb06ff',  label: '0.45' },
    { color: '#c9db06ff',  label: '0.51' },
    { color: '#94c805ff',  label: '0.58' },
    { color: '#7abb05ff',  label: '0.65' },
    { color: '#6cb006ff',  label: '0.7' },
    { color: '#5da604ff',  label: '0.75' },    
    { color: '#4f9b04ff',  label: '0.8' },
    { color: '#428f05ff',  label: '0.85' },
    { color: '#338504ff',  label: '0.9' ,textColor: '#FAFAFA',},
    { color: '#237a00ff',  label: '0.95' ,textColor: '#FAFAFA',},
    { color: '#156e00ff',  label: '1' ,textColor: '#FAFAFA',},
];

// 0,#FF2200
// 0.07,#FF4D00
// 0.13,#FF6A00
// 0.2,#FF8400
// 0.26,#FFA200
// 0.33,#FFBB00
// 0.4,#FFD900
// 0.46,#FFF200
// 0.53,#EAF200
// 0.59,#C5DB00
// 0.66,#A4C400
// 0.73,#81B000
// 0.79,#619900
// 0.86,#468700
// 0.93,#287300
// 1,#006100

const p5 = [
    { color: '#FF2200',  label: '0' },
    { color: '#FF4D00',  label: '0.07' },
    { color: '#FF6A00', textColor: "", label: '0.13' },
    { color: '#FF8400',  label: '0.2' },
    { color: '#FFA200',  label: '0.26' },
    { color: '#FFBB00',  label: '0.33' },
    { color: '#FFD900',  label: '0.4' },
    { color: '#FFF200',  label: '0.46' },
    { color: '#EAF200',  label: '0.53' },
    { color: '#C5DB00',  label: '0.59' },
    { color: '#A4C400',  label: '0.66' },
    { color: '#81B000',  label: '0.73' },    
    { color: '#619900',  label: '0.79' },
    { color: '#468700',  label: '0.86' ,textColor: '#FAFAFA', },
    { color: '#287300',  label: '0.93' ,textColor: '#FAFAFA',},
    { color: '#006100',  label: '1' ,textColor: '#FAFAFA',},
]


const palettes = [p1,p2,p3,p4,p5];
const ColorPalette = (props) => {
    const { type } = props;
    return (
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center',alignItems: 'center'}}>
            { palettes[type-1].map((e, index )=> <div  key={index} style={{ flex: e.flex ? e.flex: 1, textAlign: 'center', fontSize: 12, color: e.textColor, backgroundColor: e.color, height: 20 }}> {e.label}</div>)}
        </div>
    )
}
export default ColorPalette;



