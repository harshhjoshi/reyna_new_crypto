import Header from "../../components/header/Header";
import Sidebar from "../../components/siderbar/Sidebar";
import { useSelector } from "react-redux";

const Main = ({ children }) => {
    const state = useSelector(state => state.user);
    return (
        <>
            <Header />
            {children}
            {
                state.user && <Sidebar />
            }

        </>
    )
}
export default Main;