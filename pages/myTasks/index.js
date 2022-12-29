import { async } from "@firebase/util";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import TaskDetails from "../../components/TaskDetails";
import { AuthContext } from "../../contexts/AuthProvider";

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/allTasks/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTasks(data);
            });
    }, [user]);

    return (
        <div>
            <Head>
                <title>My Task | Task Tracker</title>
            </Head>
            <h1>All My Tasks</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => (
                    <TaskDetails key={task._id} task={task}></TaskDetails>
                ))}
            </div>
        </div>
    );
};

export default MyTasks;

// export const getStaticProps = async AuthContext => {
//     const { user } = useContext(AuthContext);
//     const res = await fetch(`http://localhost:5000/allTasks/${user.email}`);
//     const data = await res.json();
//     console.log(data);
//     return {
//         props: {
//             tasks: data,
//         },
//     };
// };
