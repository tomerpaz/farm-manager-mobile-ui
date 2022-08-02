import { AccordionSummary, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/system';






const SelectionsTypography = styled(Typography)(({ theme }) => ({
    marginLeft: 150,
    marginRight: 150,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flex: 1,

}));

/*
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            flex: 1,
        },
*/




const ReportAccordionSummary = ({ title, selections }) => {

    return (
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography /*className={classes.heading}*/>{title}</Typography>
            <SelectionsTypography >
                {selections}
            </SelectionsTypography>
        </AccordionSummary>
    )
}

export default ReportAccordionSummary;



