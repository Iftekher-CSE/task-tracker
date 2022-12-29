import { Button, Checkbox, FileInput, Label, TextInput } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";

const AddTask = () => {
    const handelTaskSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const taskName = form.taskName.value;
        const taskDetails = form.taskDetails.value;
        const taskImage = form.taskImage.files[0];

        const formData = new FormData();
        formData.append("image", taskImage);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
        console.log(url);
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
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
