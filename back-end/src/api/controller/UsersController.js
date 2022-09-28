const usersService = require('../service/UsersService');

const usersController = {
  create: async (req, res) => {
    usersService.validateBody(req.body);
    
    const token = await usersService.create(req.body);

    res.status(201).json({ token });
  },

  createAdm: async (req, res) => {
    usersService.validateBody(req.body);
    
    const token = await usersService.create(req.body);

    res.status(201).json({ token });
  },

  list: async (_req, res) => {
    const users = await usersService.list();

    console.log('list users controller');

    res.status(200).json(users);
  },

  findById: async (req, res) => {
    const { id } = req.params;

    const items = await usersService.findById(id);

    res.status(200).json(items);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    
    await usersService.delete(id);

    res.status(204).send();
  },

  update: async (req, res) => {
    const { id } = req.params;

    const items = usersService.validateBody(req.body);
    
    const updatedItem = await usersService.update(id, items);

    res.status(200).json(updatedItem);
  },
};

module.exports = usersController;