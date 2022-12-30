import { Button, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import PrimaryButton from "../components/PrimaryButton";
import SmallSpinner from "../components/SmallSpinner";
import { AuthContext } from "../contexts/AuthProvider";

const AddTask = () => {
    const { user, setLoading, loading } = useContext(AuthContext);
    const router = useRouter();

    const handelTaskSubmit = event => {
        setLoading(true);
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const taskDetails = form.taskDetails.value;
        const userEmail = user.email;
        const taskImage = form.taskImage.files[0];

        const formData = new FormData();
        formData.append("image", taskImage);
        const url = `https://api.imgbb.com/1/upload?expiration=3600&key=0c1263ea8fd9c400053f888911233802`;
        // console.log(url);
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const taskImage = imgData.data.url;
                    const taskData = { taskName, taskDetails, taskImage, userEmail };

                    // store task data to DB
                    fetch("https://task-tracker-server-side.vercel.app/tasks", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(taskData),
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            if (result.acknowledged) {
                                toast.success(`${taskName} task added!`);
                                router.push("/myTasks");
                                setLoading(false);
                            }
                        });
                }
            });
        // console.log(taskName, taskDetails, taskImage);
        setLoading(false);
    };
    return (
        <div>
            <Head>
                <title>Add Task | Task Tracker</title>
            </Head>
            <h1 className="text-3xl text-center font-bold text-[#00A8EC]">Add A Task</h1>
            <form onSubmit={handelTaskSubmit} action="" className="flex flex-col gap-4 mx-10">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="taskName" value="Task Name" />
                    </div>
                    <TextInput id="taskName" name="taskName" type="text" placeholder="task name" required={true} />
                </div>

                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Upload file" />
                    </div>
                    <FileInput id="file" name="taskImage" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="taskDetails" value="Task Details" />
                    </div>
                    <TextInput
                        id="taskDetails"
                        name="taskDetails"
                        type="text"
                        placeholder="task details"
                        required={true}
                    />
                </div>
                <PrimaryButton
                    type="submit"
                    classes="w-full px-8 py-3 font-semibold rounded-xl bg-gray-900 hover:bg-[#23292E] hover:text-white text-gray-100"
                >
                    {loading ? <SmallSpinner></SmallSpinner> : "Submit"}
                </PrimaryButton>
            </form>
        </div>
    );
};

export default AddTask;
