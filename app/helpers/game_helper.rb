module GameHelper
  def enemies
    %w[1 2 3].map do |num|
      image_path("enemy#{num}.png")
    end
  end

  def player
    image_path("player.png")
  end

  def space
    image_path("space.png")
  end
end
