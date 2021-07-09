class ConversationsController < ApplicationController
    before_action :params_2, only: [:create, :set_conversation]
    skip_before_action :set_user, only: [:create, :show]
    before_action :set_conversation, only: :create
    #before_action :audio_params, only: :audio


def new
    @conversation = Conversation.new
end

def audio
    head :no_content
    ActionCable.server.broadcast "conversation_#{params[:id]}", params 
end

def create
    @conversation ||= Conversation.new
    if @conversation.id
        @conversation.state << session[:user]
        @conversation.save!
        redirect_to conversation_path(@conversation)
        
    else
        @conversation.frequency = params_2[:frequency]
        @conversation.state << session[:user]
        @conversation.save!
        redirect_to conversation_path(@conversation)
    end
        
end

def show
    @conversation= Conversation.find(params[:id])
    @user= session[:user]
  
end

def set_conversation
    @conversation= Conversation.where(frequency: params_2[:frequency]).first
    
end
    private
    def params_2
        params.require(:conversation).permit(:frequency, :id, :state)
    end

    # def audio_params
    #     params.require(:id).permit(:type, :from, :to, :sdp, :candidate)
    # end

end
