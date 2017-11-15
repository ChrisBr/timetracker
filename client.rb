require 'net/http'
require 'json'

SERVER_URL = 'http://localhost:3000'
EMAIL = 'cbruckmayer@gmx.net'
PASSWORD = '1234'

uri = URI("#{SERVER_URL}/authenticate")
res = Net::HTTP.post_form(uri, 'email' => EMAIL, 'password' => PASSWORD)

case res
when Net::HTTPSuccess, Net::HTTPRedirection
  puts "Successfully authenticated!"
  token = JSON.parse(res.body)['auth_token']
  while true
    rfid = gets
    header = {
      'Content-Type' => 'application/json',
      'Authorization' => token,
    }

    uri = URI("#{SERVER_URL}/activities")
    https = Net::HTTP.new(uri.host, uri.port)
    #https.use_ssl = true
    req = Net::HTTP::Post.new(uri.path, header)
    req.set_form_data({'rfid' => rfid}, ';')
    res = https.request(req)
    puts "Response #{res.code} #{res.message}: #{res.body}"
  end
else
  res.error!
end
