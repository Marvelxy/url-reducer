class CreateUrls < ActiveRecord::Migration[5.1]
  def change
    create_table :urls do |t|
      t.string :short
      t.string :long
      t.integer :user_id
      t.timestamps
    end
  end
end
