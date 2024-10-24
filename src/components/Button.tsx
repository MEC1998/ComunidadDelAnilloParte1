interface ButtonProps {
    backgroundColor?: string;
    textColor?: string;
    label: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ backgroundColor = '#fff', textColor = '#000000', label, onClick }) => {
    const buttonStyle: React.CSSProperties = {
        backgroundColor,
        color: textColor,
    };

    return (
        <button style={buttonStyle} onClick={onClick} className="buttonContainer">
            {label}
        </button>
    );
};

export default Button;
