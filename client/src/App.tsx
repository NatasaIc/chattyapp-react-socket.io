import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");

  const socket = io("http://localhost:3000", { autoConnect: false });

  useEffect(() => {
    socket.on("new_user_connected", (username) => {
      console.log(username);
    });
  }, []);

  const initChat = () => {
    socket.connect();

    socket.emit("user_connected", username);
  };

  return (
    <div className="App">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Välj ett användarnamn..."
      />
      <button onClick={initChat}>Börja chatta</button>
      <p>{username}</p>
    </div>
  );
}

export default App;
