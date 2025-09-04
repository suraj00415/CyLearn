import { selectCurrentToken, selectCurrentUser, setLogout } from '../../state/auth/authSlice.ts'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
    const accessToken: string = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser) // Assuming user object contains stakeHolderType
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!accessToken?.length) {
            dispatch(setLogout())
        }
    }, [accessToken, dispatch])

    if (!accessToken?.length) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Redirect user to their respective dashboard
    const allowedPath = `/dashboard/${user?.stakeHolderType}`

    if (location.pathname.startsWith('/dashboard/') && !location.pathname.startsWith(allowedPath)) {
        return <Navigate to={allowedPath} replace />
    }

    return <Outlet />
}
