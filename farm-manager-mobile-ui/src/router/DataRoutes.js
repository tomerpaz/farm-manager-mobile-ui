import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading'
import { selectCurrentYear } from '../features/app/appSlice'
import { useGetFieldsByYearQuery } from '../features/fields/fieldsApiSlice'

const DataRoutes = () => {
    const year = useSelector(selectCurrentYear);

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFieldsByYearQuery(year)

    return data ? <Outlet /> : <Loading />
}

export default DataRoutes