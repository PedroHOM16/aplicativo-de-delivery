const loginService = require('../services/loginService');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateBodyLogin(req.body);
    await loginService.getByUserOrThrows(data);
    const { email } = data;
    const token = await loginService.makeToken({ email });
    res.json({ token });
  },
};

module.exports = loginController;
