import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");

  const socket = io("http://localhost:3000", { autoConnect: false });

  useEffect(() => {
    // Lyssna på händelsen och logga användarnamnet till konsolen när det ansluter en ny användare.
    socket.on("username_clients_only", (newUsername) => {
      console.log(newUsername);
    });
  }, []);

  const initChat = () => {
    socket.connect();

    // Skicka en användaranslutningshändelse till servern med det aktuella användarnamnet.
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
