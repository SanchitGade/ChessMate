import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080";

function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return socket;
}

export default useSocket;
