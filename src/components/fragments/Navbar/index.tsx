import { signIn, signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const { data } = useSession();
    return (
        <div className="flex items-center justify-end w-full h-7 bg-slate-600 text-white">
            <button onClick={() => data ? signOut() : signIn()} className="p-4 bg-black text-white">{data ? "Logout" : "Login"}</button>
        </div>
    )
}

export default Navbar;