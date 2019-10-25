FactoryBot.define do
  #sequence(:username) {|n| "username#{n}"}
  sequence(:email) {|n| "email#{n}@example.text" }
  sequence(:passord) {|n| "******" }

  factory :user do
    #username { generate :username }
    email { generate :email }
    password { generate :password }
  end
end
