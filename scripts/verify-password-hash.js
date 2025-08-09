const bcrypt = require("bcryptjs")

async function verifyPassword() {
  const password = "123456"
  const hash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"

  console.log("🔐 Verificando hash de contraseña...")
  console.log("Contraseña:", password)
  console.log("Hash:", hash)

  const isValid = await bcrypt.compare(password, hash)
  console.log("✅ Resultado:", isValid ? "VÁLIDO" : "INVÁLIDO")

  if (isValid) {
    console.log("🎉 El hash funciona correctamente!")
  } else {
    console.log("❌ El hash no coincide con la contraseña")
  }
}

verifyPassword().catch(console.error)
