import { useSelector } from "react-redux"
import { selectLang } from "../../../../features/app/appSlice"
import { useGetUserDataQuery } from "../../../../features/auth/authApiSlice"
import { useFieldArray } from "react-hook-form";
import WaypointSelectionDialog from "../../../dialog/WaypointSelectionDialog"

const ActivityWaypoints = ({ activity, getValues, control, register, errors, activityArea, crop, openWaypointSelection, setOpenWaypointSelection }) => {

    const { fields, append, prepend, remove, swap, move, insert, update, replace } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "points", // unique name for your Field Array
        keyName: "key",
        rules: { required: true }
    });
    const text = useSelector(selectLang)
    const { data: user } = useGetUserDataQuery()


    // const handleDeletePoint = (index) => {
    //     console.log('remove',index)
    //     remove(index)
    // };



    const handleCloseWaypoints = (values) => {
        setOpenWaypointSelection(false);
         if (values) {
        //     const alreadySelectedIDs = fields.map(e => e.finding.id);
        //     const newtlySelectedFields = selectedElements.filter(e => !alreadySelectedIDs.includes(e.id)).map(e => {
        //         return {
        //             finding: e,
        //             note: '',
        //             qty: 0,
        //             location: 'none',
        //             infectionLevel: 'none',
        //             stage: stages.find(e=>e.code === 'none')
        //         }
        //     }
        //     );
             replace(values)
         }
    }


    console.log('points',fields)
    return (

        <WaypointSelectionDialog open={openWaypointSelection} handleClose={handleCloseWaypoints} fields={getValues('fields')} waypoints={fields} />

    )
}

export default ActivityWaypoints