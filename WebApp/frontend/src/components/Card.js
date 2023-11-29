const Card = ({children, className}) => {
  return (
    <div className={`p-6 shadow-lg bg-white rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export default Card;