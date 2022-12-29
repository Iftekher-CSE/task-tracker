import { GiCarWheel } from "react-icons/gi";

const SmallSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin">
                <GiCarWheel className="w-8 h-8"></GiCarWheel>
            </div>
        </div>
    );
};

export default SmallSpinner;
