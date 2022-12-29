import { Button, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const handelTaskSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const taskDetails = form.taskDetails.value;
        const userEmail = user.email;
        const taskImage = form.taskImage.files[0];

        const formData = new FormData();
        formData.append("image", taskImage);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=0c1263ea8fd9c400053f888911233802`;
        console.log(url);
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
                    fetch("http://localhost:5000/tasks", {
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
                            }
                        });
                }
            });
        console.log(taskName, taskDetails, taskImage);
    };
    return (
        <div>
            <Head>
                <title>Add Task | Task Tracker</title>
            </Head>
            <h1 className="text-3xl text-center font-bold">Add A Task</h1>
            <form onSubmit={handelTaskSubmit} className="flex flex-col gap-4 mx-10">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="taskName" value="Task Name" />
                    </div>
                    <TextInput id="taskName" name="taskName" type="text" placeholder="task name" required={true} />
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
                <div id="fileUpload">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Upload file" />
                    </div>
                    <FileInput id="file" name="taskImage" />
                </div>
                <Button className="my-5" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddTask;
