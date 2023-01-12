import { useEffect } from "react"
import { IPageProps } from "../../types/next-related-extensions"


function Dashboard(props: any){
    useEffect(()=>{
        console.log("Props::", props)
    }, [props])
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard


export const getStaticProps = async () => {
    return {
        props: {
            layout: "dashboard",
            accessLevel: "private"
        } as IPageProps
    }
}