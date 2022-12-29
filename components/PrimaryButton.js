const PrimaryButton = ({ children, classes, handler }) => {
    return (
        <button
            onClick={handler}
            className={`bg-[#FBE122] text-[#23292E] hover:bg-[#23292E] hover:text-[#FBE122] rounded-xl ${classes}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
