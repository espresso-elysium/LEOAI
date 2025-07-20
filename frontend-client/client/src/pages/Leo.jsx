import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";

const Leo = () => {
  const [recents, setRecents] = useState(() => {
    const saved = localStorage.getItem("recents");
    return saved ? JSON.parse(saved) : [];
  });

  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const [Gname, setGname] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/userinfo`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUsername(data.username);
        setGname(data.Gname);
      })
      .catch((err) => {
        console.error(err);
        window.location.href = "/login";
      });
  }, []);

  useEffect(() => {
    // Fetch recents from backend
    fetch(`${import.meta.env.VITE_API}/api/recents`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setRecents(data.map(r => r.chat)))
      .catch(err => console.error("Failed to fetch recents:", err));
  }, []);

  const handleNewChat = async () => {
    if (chat.length > 0) {
      // Save to backend
      await fetch(`${import.meta.env.VITE_API}/api/recents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ chat }),
      });
      // Optionally, refetch recents after saving
      fetch(`${import.meta.env.VITE_API}/api/recents`, {
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => setRecents(data.map(r => r.chat)));
    }
    setChat([]);
  };

  const handleSelectRecent = (idx) => {
    setChat(recents[idx]);
  };

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login"; // or use navigate("/login")
  };

  const handleDeleteRecent = (idx) => {
    setRecents((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        recents={recents}
        onNewChat={handleNewChat}
        onSelectRecent={handleSelectRecent}
        onDeleteRecent={handleDeleteRecent}
      />
      <Main
        chat={chat}
        setChat={setChat}
        onNewChat={handleNewChat}
        username={username}
        Gname={Gname}
      />
    </div>
  );
};

export default Leo;
