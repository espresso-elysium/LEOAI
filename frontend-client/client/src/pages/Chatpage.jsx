// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Main from "../components/Main/Main";

// const Leo = () => {
//   const [recents, setRecents] = useState(() => {
//     const saved = localStorage.getItem("recents");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [chat, setChat] = useState([]);
//   const [username, setUsername] = useState("");
//   const [Gname, setGname] = useState("");

//   useEffect(() => {
//     const apiUrl = import.meta.env.VITE_API_URL || "";
//     fetch(`${apiUrl}/api/userinfo`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         setUsername(data.username);
//         setGname(data.Gname);
//       })
//       .catch((err) => console.error("User info fetch failed:", err));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("recents", JSON.stringify(recents));
//   }, [recents]);

//   const handleNewChat = () => {
//     if (chat.length > 0) {
//       setRecents((prev) => [chat, ...prev]);
//     }
//     setChat([]);
//   };

//   const handleSelectRecent = (idx) => {
//     setChat(recents[idx]);
//   };

//   const handleDeleteRecent = (idx) => {
//     setRecents((prev) => prev.filter((_, i) => i !== idx));
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         recents={recents}
//         onNewChat={handleNewChat}
//         onSelectRecent={handleSelectRecent}
//         onDeleteRecent={handleDeleteRecent}
//       />
//       <Main
//         chat={chat}
//         setChat={setChat}
//         onNewChat={handleNewChat}
//         username={username}
//         Gname={Gname}
//       />
//     </div>
//   );
// };

// export default Leo;
