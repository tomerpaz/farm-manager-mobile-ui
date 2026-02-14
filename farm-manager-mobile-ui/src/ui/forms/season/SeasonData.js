import SeasonDataForm from './SeasonDataForm'
import { useGetSeasonDataQuery } from '../../../features/season/seasonDataApiSlice'
import { setEmptyIfNull, setISODate } from '../../FarmUtil'
import { useFieldsById } from '../../../features/fields/fieldsApiSlice'

const SeasonData = ({ open, handleClose, year, fieldId }) => {

  const { data, isSuccess } = useGetSeasonDataQuery({ year, fieldId })
  const field = useFieldsById(year, Number(fieldId))

  if(!data || !field){
    return <div/>
  }
  const defaultValues = {...data};
  setISODate(defaultValues,'ripe')
  setISODate(defaultValues,'flash')
  setEmptyIfNull(defaultValues,'estimateProducePerAreaUnit')
  defaultValues.field = field;
  return (
    <SeasonDataForm open={open} handleClose={handleClose} defaultValues={defaultValues} plantation={field.plantation}  />
  )
}

export default SeasonData