import { Carousel } from "flowbite-react";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Home | Task Tracker</title>
            </Head>
            <div className="h-56 sm:h-64 md:h-80 lg:h-96">
                <Carousel slideInterval={5000}>
                    <img
                        src="https://thumbs.dreamstime.com/b/tiny-business-people-manager-tasks-goals-accomplishment-chart-task-management-project-managers-tool-task-management-143100389.jpg"
                        alt="..."
                    />
                    <img
                        src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2019Q1/scheduling/time-management-how-to-create-a-schedule-header@2x.png"
                        alt="..."
                    />
                    <img
                        src="https://www.notifyvisitors.com/pb/wp-content/uploads/2020/07/How-To-Organize-Work-With-Visual-Task-Management_banner-1024x341.jpg"
                        alt="..."
                    />
                </Carousel>
            </div>
        </>
    );
}
