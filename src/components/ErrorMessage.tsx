type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div>{message}</div>;
}

export default ErrorMessage;
