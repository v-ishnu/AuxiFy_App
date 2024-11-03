import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  const [cureentTrack, setCureentTrack] = useState(null);

  return (
    <PlayerContext.Provider value={{ cureentTrack, setCureentTrack}}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;