const bcrypt = require("bcryptjs")

async function generateHash() {
  const password = "123456"
  const saltRounds = 10

  console.log("Generando hash para contraseña:", password)

  const hash = await bcrypt.hash(password, saltRounds)
  console.log("Hash generado:", hash)

  // Verificar que el hash funciona
  const isValid = await bcrypt.compare(password, hash)
  console.log("Verificación del hash:", isValid ? "✅ Válido" : "❌ Inválido")

  return hash
}

generateHash().catch(console.error)
