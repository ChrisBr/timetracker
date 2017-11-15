// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels
//
// (function() {
//   this.App || (this.App = {});
//
//   App.cable = ActionCable.createConsumer('/cable?auth_token=' + sessionStorage.getItem('auth_token'));
//
// }).call(this);

function loadActioncable(){
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer('/cable?auth_token=' + sessionStorage.getItem('auth_token'));
}
