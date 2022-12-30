const PrimaryButton = ({ children, classes, handler }) => {
    return (
        <button
            onClick={handler}
            className={`bg-[#00A8EC] text-[#ffff] hover:bg-[#23292E] hover:text-[00A8EC] rounded-xl ${classes}`}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
