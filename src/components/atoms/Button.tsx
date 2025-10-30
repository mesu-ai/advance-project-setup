const Button = ({ title = '', onClick = null }) => {
  return (
    <button type="button" onClick={() => onClick}>
      {title}
    </button>
  );
};

export default Button;
