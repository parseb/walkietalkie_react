class ConversationsController < ApplicationController

def new
    @conversation = Conversation.new
end

def create


end



def show
    @user= session[:current_user]
  
end

end
