import { Button, Card, Dropdown, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export default function TaskDetails({ task }) {
    const router = useRouter();

    const deleteHandler = () => {
        fetch(`https://task-tracker-server-side.vercel.app/allTasks/${task._id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success("Deleted Confirmed");
                    router.push("/addTask");
                }
            });
    };

    const taskCompleteHandler = () => {
        fetch(`https://task-tracker-server-side.vercel.app/allTasks/completed/${task._id}`, {
            method: "PUT",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("Task Completed");
                    router.push("/completedTasks");
                }
            });
    };

    const handelTaskSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const updatedTaskDetails = form.updateTaskDetails.value;
        console.log(updatedTaskDetails);
        // const taskData = { updatedTaskDetails };
        // console.log(taskData);

        // store updated task data to DB
        fetch(`https://task-tracker-server-side.vercel.app/updateTask/${task._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ updatedTaskDetails }),
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success(`${task.taskName} task updated!`);
                    // router.push("/myTasks");
                }
            });
    };

    return (
        <div className="max-w-sm">
            <Card>
                <div className="flex flex-col items-center pb-10">
                    <img className="mb-3 shadow-lg h-48 w-44 rounded-md" src={task.taskImage} alt="task image" />
                    <h5 className="mb-1 text-xl font-medium text-red-900 dark:text-white">{task.taskName}</h5>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="taskDetails" value="Task Details" />
                        </div>
                        <form onSubmit={handelTaskSubmit} className="flex flex-col md:flex-row gap-2">
                            <TextInput
                                name="updateTaskDetails"
                                id="taskDetails"
                                type="text"
                                required={true}
                                defaultValue={task.taskDetails}
                            />
                            <Button type="submit">Update Task</Button>
                        </form>
                    </div>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                        <button
                            onClick={taskCompleteHandler}
                            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Task Completed
                        </button>
                        <button
                            onClick={deleteHandler}
                            className="inline-flex items-center rounded-lg border border-red-300 bg-white py-2 px-4 text-center text-sm font-medium text-red-900 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-white dark:hover:border-red-700 dark:hover:bg-red-700 dark:focus:ring-red-700"
                        >
                            Delete Task
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
