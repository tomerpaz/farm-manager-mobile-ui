import { Outlet } from 'react-router-dom'
import { useGetUserDataQuery } from '../../features/auth/authApiSlice'
import { useGetFieldsByYearQuery } from '../../features/fields/fieldsApiSlice'
import Loading from '../Loading'
const DataRoutes = () => {
    // const dispatch = useDispatch()
    // const fields = useSelector(selectFields);
    const { data: user } = useGetUserDataQuery()

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetFieldsByYearQuery(user.year)

    return data ? <Outlet /> : <Loading />
}

export default DataRoutes