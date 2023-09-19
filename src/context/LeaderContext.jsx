import React, { useState } from "react";

const LeaderContext = React.createContext(null);

function LeaderProvider({ children }) {
  const [leader, setLeader] = useState(null);

  return (
    <LeaderContext.Provider value={{ leader, setLeader }}>
      {children}
    </LeaderContext.Provider>
  );
}

export { LeaderContext, LeaderProvider };
