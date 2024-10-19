import { useFieldArray } from "react-hook-form";
import WaypointSelectionDialog from "../../../dialog/WaypointSelectionDialog"

const ActivityWaypoints = ({ getValues, control, openWaypointSelection, setOpenWaypointSelection }) => {

    const { fields, replace } = useFieldArray({
        control,
        name: "points",
        keyName: "key",
        rules: { required: false }
    });

    const handleCloseWaypoints = (values) => {
        setOpenWaypointSelection(false);
        if (values) {
            replace(values)
        }
    }

    return (
        <WaypointSelectionDialog open={openWaypointSelection} handleClose={handleCloseWaypoints} fields={getValues('fields')} waypoints={fields} />
    )
}

export default ActivityWaypoints