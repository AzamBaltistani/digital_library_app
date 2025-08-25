import { Outlet } from "react-router"
import AuthNavigationBar from "./components/AuthNavigationBar"
import PageWrapper from "../../components/page-wrapper"

const AuthLayout = () => {
    return (
        <PageWrapper>
            <div className="flex h-full w-full items-center justify-center ">
                <div className="flex flex-col h-full w-[90%] p-2 md:h-[80%] md:w-[60%] lg:h-[80%] lg:w-[40%]">
                    <AuthNavigationBar />
                    <Outlet />
                    {/* <SocialLogin /> */}
                </div>
            </div>
        </PageWrapper>
    )
}

export default AuthLayout