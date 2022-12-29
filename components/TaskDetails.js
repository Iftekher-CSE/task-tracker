import { Button, Card, Dropdown, Label, TextInput } from "flowbite-react";

const TaskDetails = ({ task }) => {
    return (
        <div className="max-w-sm">
            <Card>
                <div className="flex flex-col items-center pb-10">
                    <img
                        className="mb-3 h-24 w-24 rounded-full shadow-lg"
                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt="Bonnie image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-red-900 dark:text-white">{task.taskName}</h5>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="taskDetails" value="Task Details" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <TextInput id="taskDetails" type="text" required={true} defaultValue={task.taskDetails} />
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Task Completed
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center rounded-lg border border-red-300 bg-white py-2 px-4 text-center text-sm font-medium text-red-900 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-200 dark:border-red-600 dark:bg-red-800 dark:text-white dark:hover:border-red-700 dark:hover:bg-red-700 dark:focus:ring-red-700"
                        >
                            Delete Task
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TaskDetails;
