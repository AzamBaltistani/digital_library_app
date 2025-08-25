import { useRole } from "@/hooks/useRole";

export default function Dashboard() {
    const { isAdmin, isAuthor, isUser, role, isAuthenticated } = useRole();


    if (isAuthenticated) {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Your role: {role}</p>

                {isAdmin && <p>Welcome Admin! You can manage everything.</p>}
                {isAuthor && <p>Hello Author! You can manage your books.</p>}
                {isUser && <p>Hi User! Enjoy browsing.</p>}
            </div >
        )
    } return (
        <div>Sign in to earn money by publishing your digital study materials</div>
    )

}
