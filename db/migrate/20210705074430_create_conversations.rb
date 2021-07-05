class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.string :frequency
      t.text :state, array: true, default: []

      t.timestamps
    end
  end
end
