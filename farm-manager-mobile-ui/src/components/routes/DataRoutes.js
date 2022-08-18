import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectUser } from '../../features/auth/authSlice'
import { useGetFieldsByYearQuery } from '../../features/fields/fieldsApiSlice'
import { selectFields, setFields } from '../../features/fields/fieldSlice'
import Loading from '../Loading'
const DataRoutes = () => {
    const dispatch = useDispatch()
    const fields = useSelector(selectFields);
    const user = useSelector(selectUser);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFieldsByYearQuery(user.year)
   
    useEffect(() => {
        if (isSuccess) {
            const fieldsData = data.ids.map(id => data.entities[id]);
            dispatch(setFields(fieldsData));
        } 

    }, [data, isLoading, isSuccess, isError])

    return fields ? <Outlet /> : <Loading />
}

export default DataRoutes