defmodule Console.Auth do
  @moduledoc """
  The Auth context.
  """

  import Ecto.Query, warn: false
  alias Console.Repo
  alias Console.Auth.User

  def get_user_by_id(id) do
    Repo.get(User, id)
  end

  def get_user_by_id_and_email(user_id, email) do
    case get_user_by_id(user_id) do
      %{super: is_super} -> get_user_data_map(user_id, email, is_super)
      _ -> get_user_data_map(user_id, email)
    end
  end

  defp get_user_data_map(user_id, user_email, super_user \\ false) do
    %User{id: user_id, super: super_user, email: user_email}
  end
end
