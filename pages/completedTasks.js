import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import CompletedTask from "../components/CompletedTask";
import { AuthContext } from "../contexts/AuthProvider";

export default function CompletedTasks() {
    const { user, setLoading } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`https://task-tracker-server-side.vercel.app/completedTasks/${user?.email}`)
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
            <h1 className="text-3xl text-center font-bold text-[#00A8EC]">My All Task</h1>{" "}
            {tasks.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map(task => (
                            <CompletedTask key={task._id} task={task}></CompletedTask>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl mt-20 text-center font-bold text-red-500">No completed tasks to show</h1>
                </>
            )}
        </div>
    );
}
