class AddAdoptedDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :cats, :adopted, :boolean, :default => false
  end
end
