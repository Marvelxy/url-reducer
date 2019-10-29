class AddIndexToUrl < ActiveRecord::Migration[5.1]
  def change
    add_index :urls, :short, :unique => true
    add_index :urls, :long, :unique => true
  end
end
