import React from 'react'
import SeasonDataForm from './SeasonDataForm'
import { useGetSeasonDataQuery } from '../../../features/season/seasonDataApiSlice'
import { parseISO } from 'date-fns'
import { setEmptyIfNull, setISODate } from '../../FarmUtil'
import { useFieldsById } from '../../../features/fields/fieldsApiSlice'
import { fi } from 'date-fns/locale'

const SeasonData = ({ open, handleClose, year, fieldId }) => {

  const { data, isSuccess } = useGetSeasonDataQuery({ year, fieldId })
  const field = useFieldsById(year, Number(fieldId))

  if(!data){
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