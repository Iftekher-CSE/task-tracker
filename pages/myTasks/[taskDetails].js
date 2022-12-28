import { useRouter } from "next/router";

const TaskDetails = () => {
    const router = useRouter();
    const taskId = router.query.taskDetails;
    return (
        <div>
            <h1>Task {taskId}</h1>
        </div>
    );
};

export default TaskDetails;
