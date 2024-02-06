import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@mui/material';
import { blue, green, red, orange } from '@mui/material/colors';
import { BugReport, ExpandMore, NaturePeople, OpacityOutlined, ScatterPlot } from '@mui/icons-material';
import WaterBarchart from './WaterBarchart';
import { selectFieldDashboardYear, selectCurrentYear, selectLang } from '../../../features/app/appSlice';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../../../features/auth/authApiSlice';
import { formatNumber } from '../../FarmUtil';
import { useGetFieldDashBoardQuery } from '../../../features/dashboard/dashboardApiSlice';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import FieldFertilizerTable from './FieldFertilizerTable';
import FieldPesticdeTable from './FieldPesticdeTable';


const elevation = 4;
const cardHeaderPadding = 1;

const FieldDashboard = () => {

  const text = useSelector(selectLang)
  const { data: user } = useGetUserDataQuery()

  const [expandedPesticides, setPxpandedPesticides] = useState(false);
  const [expandedFertilizers, setExpandedFertilizers] = useState(false);

  const { fieldId } = useParams()

  const year = useSelector(selectFieldDashboardYear)
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFieldDashBoardQuery({ fieldId, year })


  if (isLoading) {
    return <Loading />
  }

  return (
    <Box sx={{ width: '100%', height: '100%', paddingBottom: 5 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid item xs={6}>
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: orange[500] }}>
                <NaturePeople />
              </Avatar>}
              title={<Typography whiteSpace={'nowrap'} variant='body2'>{`${formatNumber(data.weightTotal)} ${text[user.weightUnit]}`}</Typography>}
              subheader={<Typography whiteSpace={'nowrap'} variant='body2'>{`${formatNumber(data.weightPerAreaUnit)}   ${text[user.weightUnit]}/${text[user.areaUnit]}`}</Typography>}
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
              subheader={<Typography whiteSpace={'nowrap'} variant='body2'>{`${formatNumber(data.expensePerAreaUnit)}/${text[user.areaUnit]}`}</Typography>}
            />
          </Card>
        </Grid>
        <Grid item xs={4} >
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: 'inherit', color: blue[700], fontWeight: 'bolder' }} aria-label="recipe">K</Avatar>}
              title={<Typography whiteSpace={'nowrap'} variant='body2'>{`${data.kperAreaUnit} /`}</Typography>}
              subheader={text[user.areaUnit]}
            />
          </Card>
        </Grid>
        <Grid item xs={4} >
          <Card elevation={elevation}>
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: 'inherit', color: green[700], fontWeight: 'bolder' }} aria-label="recipe">P</Avatar>}
              title={<Typography whiteSpace={'nowrap'} variant='body2'>{`${data.pperAreaUnit} /`}</Typography>}
              subheader={text[user.areaUnit]}
            />
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card elevation={elevation} >
            <CardHeader sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: 'inherit', color: red[700], fontWeight: 'bolder' }} aria-label="recipe">N</Avatar>}
              title={<Typography whiteSpace={'nowrap'} variant='body2'>{`${data.nperAreaUnit} /`}</Typography>}
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
                <FieldPesticdeTable pesticides={data.pesticides} />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={elevation}>
            <CardHeader onClick={() => setExpandedFertilizers(!expandedFertilizers)} sx={{ padding: cardHeaderPadding }}
              avatar={<Avatar sx={{ bgcolor: orange[500] }} aria-label="recipe"><ScatterPlot /></Avatar>}
              title={text.fertilizers}
              action={
                <IconButton aria-label="fertilizers">
                  <ExpandMore />
                </IconButton>
              }
            />
            <Collapse in={expandedFertilizers} timeout="auto" unmountOnExit>
              <CardContent>
                <FieldFertilizerTable fertilizers={data.fertilizers} />
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </Box >
  );
}

export default FieldDashboard;
