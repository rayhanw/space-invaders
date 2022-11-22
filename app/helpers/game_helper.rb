module GameHelper
  def enemies
    %w[1 2 3].map do |num|
      image_url("enemy#{num}.png")
    end
  end

  def player
    image_url("player.png")
  end

  def space
    image_url("space.png")
  end

  def shoot
    audio_url("space-invaders_sounds_shoot.wav")
  end

  def enemy_death
    audio_url("space-invaders_sounds_enemy-death.wav")
  end
end
