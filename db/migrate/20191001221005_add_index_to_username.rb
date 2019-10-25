class AddIndexToUsername < ActiveRecord::Migration[5.1]
  def change
    #add_column :usernames, :, :username,
    #add_column :usernames, :, :unique
    #add_column :usernames, :=, :string
    add_index :users, :username, :unique => true
  end
end
