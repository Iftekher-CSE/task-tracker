import { useRouter } from "next/router";

const CompletedTaskDetails = () => {
    const router = useRouter();
    const completedTaskId = router.query.completedTaskDetails;
    return (
        <div>
            <h1>Task {completedTaskId}</h1>
        </div>
    );
};

export default CompletedTaskDetails;
