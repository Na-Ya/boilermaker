// ACTION TYPES
export const CHANGE_CHANNEL = 'CHANGE_CHANNEL';


// ACTION CREATORS
export function changeCurrentChannel (channelName) {
  const action = { type: CHANGE_CHANNEL, channelName };
  return action;
}