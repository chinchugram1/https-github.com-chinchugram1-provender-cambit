import bcrypt from "bcryptjs"

async function generateHash() {
  const password = "secret123"
  const hash = await bcrypt.hash(password, 10)
  console.log("Password:", password)
  console.log("Hash:", hash)

  // Verificar que el hash funciona
  const isValid = await bcrypt.compare(password, hash)
  console.log("Verification:", isValid)
}

generateHash().catch(console.error)
