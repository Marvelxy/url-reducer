class CreateUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :urls do |t|
      t.string :short, :unique => true
      t.string :long, :unique => true
      t.integer :user_id
      t.timestamps
    end
  end
end
