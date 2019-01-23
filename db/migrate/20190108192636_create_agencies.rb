class CreateAgencies < ActiveRecord::Migration[5.1]
  def change
    create_table :agencies do |t|
      t.string :name
      t.string :street_1
      t.string :street_2
      t.string :city
      t.string :state
      t.integer :zip_code
      t.string :email
      t.integer :phone_number
    end
  end
end
