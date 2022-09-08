import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@mui/material';
import { blue, green, red, orange } from '@mui/material/colors';
import { AttachMoney, BugReport, ExpandMore, NaturePeople, NaturePeopleOutlined, OpacityOutlined, ScatterPlot } from '@mui/icons-material';
import WaterBarchart from './WaterBarchart';
import { selectCurrentYear, selectLang } from '../../../features/app/appSlice';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';
import { formatNumber } from '../../FarmUtil';
import { useGetFieldDashBoardQuery } from '../../../features/dashboard/dashboardApiSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';


const elevation = 4;
const cardHeaderPadding = 1.5;

const FieldDashboard = ({ setUseHeight }) => {

  const text = useSelector(selectLang)
  const { data: user } = useGetUserDataQuery()

  const [expandedPesticides, setPxpandedPesticides] = useState(false);
  const [expandedFertilizers, setExpandedFertilizers] = useState(false);

  const { fieldId } = useParams()

  const year = useSelector(selectCurrentYear)

  

  useEffect(() => {
    setUseHeight(!expandedPesticides && !expandedFertilizers)
  }, [expandedPesticides, expandedFertilizers]);


  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetFieldDashBoardQuery({ fieldId, year})


if(isLoading){
  return <Loading/>
}
  console.log(data)

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={6}>
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: orange[500] }}>
                <NaturePeople />
              </Avatar>}
              title={`${formatNumber(data.weightTotal)} ${text[user.weightUnit]}`}
              subheader={`${formatNumber(data.weightPerAreaUnit)}   ${text[user.weightUnit]}/${text[user.areaUnit]}`}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card elevation={elevation} >
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: red[500] }}>
                {user.currency}
              </Avatar>}
              title={`${formatNumber(data.expenseTotal)}`}
              subheader={`${formatNumber(data.expensePerAreaUnit)}/${text[user.areaUnit]}`}
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card elevation={elevation} >
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">N</Avatar>}
              title={`${data.nperAreaUnit} /`}
              subheader={text[user.areaUnit]}
            />
          </Card>
        </Grid>
        <Grid item xs={4} >
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">P</Avatar>}
              title={`${data.pperAreaUnit} /`}
              subheader={text[user.areaUnit]}
            />
          </Card>
        </Grid>
        <Grid item xs={4} >
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">K</Avatar>}
              title={`${data.kperAreaUnit} /`}
              subheader={text[user.areaUnit]}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: blue[500] }}>
                <OpacityOutlined />
              </Avatar>}
              title={`${formatNumber(data.waterTotal)} ${text[user.waterUnit]}`}
              subheader={`${formatNumber(data.waterPerAreaUnit)} ${text[user.waterUnit]}/${text[user.areaUnit]}`}
            />
            <CardContent sx={{ padding: 1 }}>
              <WaterBarchart data={data.water} text={text} waterUnit={user.waterUnit} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={elevation}>
            <CardHeader onClick={() => setPxpandedPesticides(!expandedPesticides)} sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: green[500] }} aria-label="recipe"><BugReport /></Avatar>}
              title={text.pesticides}
              action={
                <IconButton aria-label="pesticides">
                  <ExpandMore />
                </IconButton>
              }
            // subheader="Dunam"
            />
            <Collapse in={expandedPesticides} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                  aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                  medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                  occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                  large plate and set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                  stirring often until thickened and fragrant, about 10 minutes. Add
                  saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and
                  peppers, and cook without stirring, until most of the liquid is absorbed,
                  15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                  mussels, tucking them down into the rice, and cook again without
                  stirring, until mussels have opened and rice is just tender, 5 to 7
                  minutes more. (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={elevation}>
            <CardHeader onClick={() => setExpandedFertilizers(!expandedFertilizers)} sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"><ScatterPlot /></Avatar>}
              title={text.fertilizers}
              action={
                <IconButton aria-label="fertilizers">
                  <ExpandMore />
                </IconButton>
              }
            />
            <Collapse in={expandedFertilizers} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                  aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                  medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                  occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                  large plate and set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                  stirring often until thickened and fragrant, about 10 minutes. Add
                  saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and
                  peppers, and cook without stirring, until most of the liquid is absorbed,
                  15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                  mussels, tucking them down into the rice, and cook again without
                  stirring, until mussels have opened and rice is just tender, 5 to 7
                  minutes more. (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Box >
  );
}

export default FieldDashboard;

const data1 = {
  weightTotal: 3002,
  weightPerAreaUnit: 45.3,
  expenseTotal: 9873,
  expensePerAreaUnit: 45.43355,
  nPerAreaUnit: 4.1,
  pPerAreaUnit: 0.9,
  kPerAreaUnit: 2.4,
  waterTotal: 4440,
  waterPerAreaUnit: 4.4,
  water: [
    {
      key: "1",
      value: 4000,
    },
    {
      key: "2",
      value: 3000,
    },
    {
      key: "3",
      value: 2000,
    },
    {
      key: "4",
      value: 2780,
    },
    {
      key: "5",
      value: 1890,
    },
    {
      key: "6",
      value: 2390,

    },
    {
      key: "7",
      value: 3490,
    },
    {
      key: "8",
      value: 4000,
    },
    {
      key: "9",
      value: 3000,

    },
    {
      key: "10",
      value: 2000,

    },
    {
      key: "11",
      value: 2780,

    },
    {
      key: "12",
      value: 2780,

    },
  ],
  pesticides: [
    {
      resource: {

      },

      date: 'sd',
      qty: 5,
      dosage: 9,

    }

  ],
  fertilizers: [
    {
      resource: {

      },

      date: 'sd',
      qty: 5,

    }

  ]
};