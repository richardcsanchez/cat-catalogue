class ChangeIntegerLimitInYourTable < ActiveRecord::Migration[5.1]
  def change
    change_column :agencies, :phone_number, :integer, limit: 8
  end
end
