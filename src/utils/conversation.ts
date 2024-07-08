export const getFormattedMessage = (messageBE, userId) => {
    return {
      id: messageBE._id,
      type: 'msg',
      text: messageBE.text,
      incoming: messageBE.senderId !== userId,
      outgoing: messageBE.senderId === userId,
      timestamp: messageBE.timestamp,
      user_name: messageBE.senderId.username,
    };
  };
  