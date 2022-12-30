import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user);

    const handelLogOut = () => {
        logout()
            .then(() => {})
            .catch(err => console.error(err));
    };

    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <img src="favicon.ico" className="mr-3 h-6 sm:h-9" alt="task Tracker" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Task Tracker
                </span>
            </Navbar.Brand>
            {user?.uid ? (
                <>
                    <div className={`flex md:order-2 `}>
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img={user?.photoURL} rounded={true} />}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">{user?.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <button onClick={handelLogOut}>Sign out</button>
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                </>
            ) : (
                <></>
            )}
            <Navbar.Collapse>
                {user?.uid ? (
                    <>
                        <Navbar.Link href="/">Home</Navbar.Link>
                        <Navbar.Link href="/addTask">Add A Task</Navbar.Link>
                        <Navbar.Link href="/myTasks">My Tasks</Navbar.Link>
                        <Navbar.Link href="/completedTasks">Completed Tasks</Navbar.Link>
                    </>
                ) : (
                    <>
                        <Navbar.Link href="/login">Login</Navbar.Link>
                        <Navbar.Link href="/register">Register</Navbar.Link>
                    </>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
