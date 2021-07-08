import consumer from "./consumer"


document.addEventListener("DOMContentLoaded", () => {
  
  let id_element = document.getElementById("station")
  let id = id_element.getAttribute("id-data") 
  console.log(id)

  consumer.subscriptions.create({ channel: "ConversationChannel", id: id  }, {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('i am connected')
      console.log(consumer)
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
    }
  });

})



