import { Box, Typography } from "@mui/material";
import { ContainedButton, OutlinedButton } from "../../components/core";
import { ACTIVITY_FROM } from "../../components/frame/Routes";
import {  height290 } from "../../utils";
import { FormRoot, FormRow, SB } from "../../utils/StyleUtils";
import TrackerActivityResourceTable from "./TrackerActivityResourceTable";
import TrackerActivityTrackTable from "./TrackerActivityTrackTable";

const TrackerActivity = (props) => {

    const { clearTrackerActivity, trackerActivity, text, areaUnit, setWarnMessage, history } = props;


    const onExecutePlanClicked = (uuid) => {
        setWarnMessage(text.executePlan);
        history.push(`/e${ACTIVITY_FROM}${uuid}/back`)
    }

    const title = trackerActivity.activity ? trackerActivity.activity.description : '';
    const ref = trackerActivity.activity ? trackerActivity.activity.docRef : '';
    const plan = trackerActivity.activity.plan === true;
    const margin = 2;

    const resourcesHeight = trackerActivity.resources.length * 36;
    const fieldHeight = height290 - resourcesHeight - 35;
    return (
        <Box display={'flex'} flexDirection={'column'} flex={1} backgroundColor='white' >
            <FormRow js={SB}>
                <Typography margin={margin} variant="h5">{title}</Typography>
                <Typography variant="h5">{ref}</Typography>

                {/* <Typography>{clearTrackerActivity.activity.description}</Typography> */}

                <Box>
                    {plan && <ContainedButton onClick={() => onExecutePlanClicked(trackerActivity.activity.id)}>{text.executePlan}</ContainedButton>}
                    <OutlinedButton onClick={() => clearTrackerActivity()}>X</OutlinedButton>
                </Box>
            </FormRow>
            <Box margin={margin}>
                <Typography variant="h6">{text.resources}</Typography>
                <TrackerActivityResourceTable height={resourcesHeight + 35} resources={trackerActivity.resources} text={text} areaUnit={areaUnit} />
                <Box marginTop={1} marginBottom={1} display={'flex'} flex={1} justifyContent={'space-between'}  >
                    <Typography variant="h6">{text.fields}</Typography>
                    <Typography variant="h6">{trackerActivity.duration} {text.hours}</Typography>
                </Box>
                <TrackerActivityTrackTable height={fieldHeight} tracks={trackerActivity.tracks} text={text} />
            </Box>
        </Box>
    )
}
export default TrackerActivity;
