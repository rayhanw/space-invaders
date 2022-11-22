import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["canvas"];
  static values = {
    enemies: Array,
    player: String,
    space: String,
  };

  connect() {
    this.canvasContext = this.canvasTarget.getContext("2d");
  }
}
