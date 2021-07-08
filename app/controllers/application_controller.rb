class ApplicationController < ActionController::Base
    before_action :set_user 



    def set_user
    color=['white','blue','red','yellow','black','purple','green'].sample
    number= rand(1000)
    animal=['rabbit','pig','rooster','lion','cougar', 'ant', 'elephant', 'cat'].sample
    s= color  + '-' + animal + '-' + number.to_s
    session[:user] = s
    end
end
