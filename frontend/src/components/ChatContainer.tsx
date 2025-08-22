import React, { useEffect, useRef, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../redux/userSlice";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { avatarImg, formatMessageTime } from "../utils/helper";

const ChatContainer: FC = () => {
  const dispatch = useDispatch();
  const { messages, isMessageLoading, selectedUser, sentMessages } =
    useSelector((state) => state.users);

  const messageEndRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  console.log("messages", messages, sentMessages, user);

  useEffect(() => {
    dispatch(fetchMessages(selectedUser._id) as any);
  }, [selectedUser._id, sentMessages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message: any) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === user._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user._id
                      ? user.profile_avatar || avatarImg()
                      : selectedUser.profile_avatar || avatarImg()
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
