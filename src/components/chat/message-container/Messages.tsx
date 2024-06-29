import Message from "./Message";

const Messages = () => {
  return (
    <div className="px-4 flex-1 overflow-auto">
      <Message fromMe={true} />
      <Message fromMe={false} />
      <Message fromMe={false} />
      <Message fromMe={true} />
      <Message fromMe={true} />
      <Message fromMe={false} />
    </div>
  );
};
export default Messages;
