const bcrypt = require("bcryptjs")

async function testPassword() {
  const password = "123456"
  const hash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"

  console.log("Testing password:", password)
  console.log("Against hash:", hash)

  const result = await bcrypt.compare(password, hash)
  console.log("Result:", result)

  // También generar un nuevo hash para comparar
  const newHash = await bcrypt.hash(password, 10)
  console.log("New hash:", newHash)

  const newResult = await bcrypt.compare(password, newHash)
  console.log("New result:", newResult)
}

testPassword().catch(console.error)
