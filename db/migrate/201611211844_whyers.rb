class Whyers < ActiveRecord::Migration
  def change
    create_table :whyers do |t|
      t.string :name
      t.string :email
      t.boolean :manager

      t.timestamps null: false
    end
  end
end
