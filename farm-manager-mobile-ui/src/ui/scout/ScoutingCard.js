import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Edit, PestControl } from '@mui/icons-material';
import { getInfectionLevelColor } from './ScoutingUtil';
import { parseDate } from '../FarmUtil';
import { useSelector } from 'react-redux';
import { selectLang } from '../../features/app/appSlice';



export default function RecipeReviewCard({ scout, onEdit, index }) {

    const text = useSelector(selectLang)

    console.log(`/images/pest${index%2}.jpg`)
    return (
        <Card sx={{ margin: 2 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: getInfectionLevelColor(scout.infectionLevel) }} aria-label="recipe">
                        <PestControl sx={{ color: 'white' }} />
                    </Avatar>
                }
                action={
                    <IconButton onClick={onEdit} aria-label="settings">
                        <Edit  />
                    </IconButton>
                }
                title={scout.finding.name}
                subheader={parseDate(scout.date)}

            />
            <CardMedia onClick={e=>console.log('CardMedia clicked')}
        component="img"
        height="194"
        image={`/images/pest${index%2}.jpg`}
        alt="Paella dish"
      />
            <CardContent>
                <Typography variant="body1" color="text.secondary" >
                    {` ${text.location}:  ${text[scout.location]}`}
                </Typography>
                <Typography variant="body1" color="text.secondary" >
                    {` ${text.infectionLevel}:  ${text[scout.infectionLevel]}`}
                </Typography>
                <Typography variant="body1" color="text.secondary"  >
                    {` ${text.phenologicalStage}:  ${scout.stage.name}`}
                </Typography>
                <Typography variant="body1" color="text.secondary" >
                    {` ${text.note}:  ${scout.note}`}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {scout.note}
                </Typography> */}
            </CardContent>
            {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
        </Card>
    );
}