class AddOwnerId < ActiveRecord::Migration[5.1]
  def change
    add_column :cats, :owner_id, :integer
    add_column :users, :owner_id, :integer
  end
end
