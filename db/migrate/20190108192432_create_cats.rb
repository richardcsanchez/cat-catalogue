class CreateCats < ActiveRecord::Migration[5.1]
  def change
    create_table :cats do |t|
      t.string :name
      t.string :breed
      t.integer :age
      t.string :sex
      t.string :disposition
      t.integer :cost
      t.boolean :adopted
      t.integer :user_id
      t.boolean :neutered
      t.string :image
      t.integer :agency_id
    end
  end
end
