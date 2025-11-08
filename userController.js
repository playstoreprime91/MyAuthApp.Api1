const prisma = require('../db');

async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function getUserById(req, res) {
  const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

async function createUser(req, res) {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  try {
    const newUser = await prisma.user.create({ data: { name, email } });
    res.status(201).json(newUser);
  } catch {
    res.status(400).json({ error: 'Email must be unique' });
  }
}

async function updateUser(req, res) {
  const { name, email } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
}

async function deleteUser(req, res) {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };