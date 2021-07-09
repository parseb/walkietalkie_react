import consumer from "./consumer"


// Broadcast Types
const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";

// DOM Elements
let currentUser;
let localVideo;
let remoteVideoContainer;

// Objects
let pcPeers = {};
let localstream;

// Ice Credentials
const ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
const logError = (error) => console.warn("Whoops! Error:", error);


document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        localstream = stream;
        localVideo.srcObject = stream;
        localVideo.muted = false;
      })
      .catch(logError);
  }
};
//////////////////////////////////

const handleJoinSession = async (id) => {
  consumer.subscriptions.create({ channel: "ConversationChannel", id: id  }, {
    connected: () => {
      broadcastData({
        type: JOIN_ROOM,
        from: currentUser,
      }, id);
    },
    received: (data) => {
      console.log("received", data);
      if (data.from === currentUser) return;
      switch (data.type) {
      case JOIN_ROOM:
        return joinRoom(data);
      case EXCHANGE:
        if (data.to !== currentUser) return;
        return exchange(data);
      case REMOVE_USER:
        return removeUser(data);
      default:
        return;
      }
    },
  });
};

const broadcastData = (data,i) => {
  
  const csrfToken = document.querySelector("[name=csrf-token]").content;
  const headers = new Headers({
    "content-type": "application/json",
    "X-CSRF-TOKEN": csrfToken,
  });

  fetch("/audio/"+i, {
    method: "POST",
    body: JSON.stringify(data),
    headers,
  });
};


//////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  
  let id_element = document.getElementById("station")
  let id = id_element.getAttribute("id-data") 
  currentUser = document.getElementById("current-user").innerHTML;
  localVideo = document.getElementById("local-video");
  remoteVideoContainer = document.getElementById("remote-video-container");
  
  const joinButton = document.getElementById("join-button");
  const leaveButton = document.getElementById("leave-button");

  joinButton.onclick = handleJoinSession(id);
  leaveButton.onclick = handleLeaveSession(id);

  console.log(id)
  console.log(currentUser)




})



