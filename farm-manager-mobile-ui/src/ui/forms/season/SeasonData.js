import React from 'react'
import SeasonDataForm from './SeasonDataForm'
import { useGetSeasonDataQuery } from '../../../features/season/seasonDataApiSlice'
import { parseISO } from 'date-fns'
import { setEmptyIfNull, setISODate } from '../../FarmUtil'

const SeasonData = ({ open, handleClose, year, fieldId }) => {

  const { data, isSuccess } = useGetSeasonDataQuery({ year, fieldId })

  if(!data){
    return <div/>
  }
  const defaultValues = {...data};
  setISODate(defaultValues,'ripe')
  setISODate(defaultValues,'flash')
  setEmptyIfNull(defaultValues,'estimateProducePerAreaUnit')
  return (
    <SeasonDataForm open={open} handleClose={handleClose} defaultValues={defaultValues}  />
  )
}

export default SeasonData