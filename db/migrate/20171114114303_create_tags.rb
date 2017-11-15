class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :rfid
      t.string :name
      t.string :colour
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
