const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <p className="text-7xl font-thin">L</p>
            <div className="w-10 h-10 rounded-full mt-5 animate-spin bg-gradient-to-r from-emerald-500 to-lime-500">
                <div className="w-8 h-8 rounded-full m-1 bg-white"></div>
            </div>
            <p className="text-7xl font-thin">ading....</p>
        </div>
    );
};

export default Spinner;
