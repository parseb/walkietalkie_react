class ApplicationController < ActionController::Base

    color=['white','blue','red','yellow','black','purple','green'].sample
    number= rand(1000)
    animal=['rabbit','pig','rooster','lion','cougar'].sample
    current_user = color + '-' + number.to_s + '-' + animal 

end
