import { toast } from 'sonner';
import { useLogoutMutation } from "../state/auth/authApi"
import { setLogout } from "../state/auth/authSlice"
import { useDispatch } from "react-redux"

export const useLogout = () => {
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()
    return async () => {
        try {
            const res = await logout(null).unwrap()
            console.log(res)
            dispatch(setLogout())
            dispatch({ type: "RESET" })
            toast.success("Logged Out Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error?.error)
        }
    }
}