cask "echoo" do
  arch arm: "aarch64", intel: "x64"

  version "0.28.0"
  sha256 arm:   "dfa1cc75c8f808c0dcaba991ad26dc834492b3f51ae26c3dd8d075c20b71cb4c",
         intel: "e4c2667d88749056205c1d9dfb2a760ea5b1f0f09c3f77bfd61be958ec620abc"

  url "https://github.com/zsmatrix62/echoo.app/releases/download/v#{version}/Echoo_#{version}_#{arch}.dmg",
    verified: "github.com/zsmatrix62/echoo.app/"

  name "Echoo"
  desc "Developer's toolbox"
  homepage "https://web.echoo.app/"

  livecheck do
    url :url
    strategy :github_latest
  end

  depends_on macos: ">= :high_sierra"

  app "Echoo.app"

  zap trash: "~/Library/Application Support/Echoo*"
end
