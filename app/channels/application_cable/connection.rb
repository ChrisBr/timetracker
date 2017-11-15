module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.email
    end

    protected

    def find_verified_user
      if current_user = User.find(decoded_auth_token[:user_id])
        current_user
      else
        reject_unauthorized_connection
      end
    end

    def decoded_auth_token
      JsonWebToken.decode(request.params[:auth_token])
    end
  end
end
