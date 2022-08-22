import Action from '@mui/icons-material/AdjustOutlined';
import Harvest from '@mui/icons-material/NaturePeople';
import Irrigation from '@mui/icons-material/Opacity';
import Spray from '@mui/icons-material/BugReport';
import Market from '@mui/icons-material/AttachMoney';
import Scout from '@mui/icons-material/BugReport';
import { SECONDARY_MAIN } from '../App';

const ActivityTypeIcon = ({ type }) => {
    const color = SECONDARY_MAIN;

    if (type.toLowerCase().includes('general')) return <Action sx={{color}}/> 
    if (type.toLowerCase().includes('spray')) return <Spray sx={{color}}/>
    if (type.toLowerCase().includes('irrigation')) return <Irrigation sx={{color}}/>
    if (type.toLowerCase().includes('harvest')) return <Harvest sx={{color}}/>
    if (type.toLowerCase().includes('market')) return <Market sx={{color}}/>
    if (type.toLowerCase().includes('scout')) return <Scout sx={{color}}/>

}

export default ActivityTypeIcon