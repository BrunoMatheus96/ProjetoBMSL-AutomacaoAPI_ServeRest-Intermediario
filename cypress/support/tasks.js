const axios = require('axios');

module.exports = (on) => {
  on('task', {
    async removerUsuario(email) {
      try {
        const { data } = await axios.get(`https://serverest.dev/usuarios?email=${email}`);
        if (data.quantidade > 0) {
          const userId = data.usuarios[0]._id;
          await axios.delete(`https://serverest.dev/usuarios/${userId}`);
          return `Usuário ${email} removido`;
        }
        return `Usuário ${email} não encontrado`;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async criarUsuario(usuario) {
      const { data } = await axios.get(`https://serverest.dev/usuarios?email=${usuario.email}`);
      if (data.quantidade > 0) {
        const userId = data.usuarios[0]._id;
        await axios.delete(`https://serverest.dev/usuarios/${userId}`);
      }
      const res = await axios.post('https://serverest.dev/usuarios', usuario);
      return { id: res.data._id, ...res.data };
    },

    async buscarUsuariosPorEmail(email) {
      const response = await axios.get(`https://serverest.dev/usuarios?email=${email}`);
      return response.data;
    },
  });
};
