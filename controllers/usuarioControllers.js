const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const UsuarioModels = require("../models/usuarioModels.js");
const sessaoModels = require("../models/seçãoModels.js");

module.exports = {
  createUser: async (req, res) => {
    const { nome, email, senha, confirm, cpf, endereço, cidade, numero } =
      req.body;
    if (!nome && !email && !senha && !endereço && !cidade && !numero) {
      return res.status(422).json({ msg: "O campo está vazio " });
    } else if (!nome) {
      return res.status(422).json({ msg: "O nome é obrigatório" });
    } else if (nome && nome.length < 8) {
      return res.status(422).json({ msg: "Em nome requer 15 caractéres" });
    } else if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório" });
    } else if (email && email.length < 15) {
      return res.status(422).json({ msg: "Em email requer 8 caractéres" });
    } else if (
      email &&
      !email.includes("@gmail.com") &&
      !email.includes("@hotmail.com")
    ) {
      return res.status(422).json({
        msg: "Use caractéres de email,como:@gmail.com ou @hotmail.com",
      });
    } else if (!senha) {
      return res.status(422).json({ msg: "A senha é obrigatório" });
    } else if (senha && senha.length < 5) {
      return res.status(422).json({ msg: "Em senha requer 5 caractéres" });
    } else if (senha && !confirm) {
      return res.json({ msg: "Digite a senha novamente" });
    } else if (confirm && confirm !== senha) {
      return res.status(422).json({ msg: "As senhas devem ser iguais" });
    } else if (!cpf) {
      return res.status(422).json({ msg: "O cpf é obrigatório" });
    } else if (cpf && cpf.length !== 11) {
      return res
        .status(422)
        .json({ msg: "Em cpf requer exatos 11 caractéres" });
    } else if (!cidade) {
      return res.status(422).json({ msg: "A cidade é obrigatório" });
    } else if (!endereço) {
      return res.status(422).json({ msg: "O endereço é obrigatório" });
    } else if (endereço && endereço.length < 15) {
      return res.status(422).json({ msg: "Em endereço requer 15 caractéres" });
    } else if (!numero) {
      return res.status(422).json({ msg: "O número é obrigatório" });
    }
    const findfornome = await UsuarioModels.findOne({
      where: {
        nome: nome,
      },
    });
    const findforemail = await UsuarioModels.findOne({
      where: {
        email: email,
      },
    });
    const findforcpf = await UsuarioModels.findOne({
      where: {
        cpf: cpf,
      },
    });

    if (findfornome) {
      return res.json({ msg: "Nome inválido" });
    } else if (findforemail) {
      return res.json({ msg: "Email inválido" });
    } else if (findforcpf) {
      return res.json({ msg: "Cpf inválido" });
    }
    const salt = await bcrypt.genSalt(8);
    const senhapronta = await bcrypt.hash(senha, salt);

    const [create, creating] = await UsuarioModels.findOrCreate({
      where: {
        nome: nome,
        email: email,
        cpf: cpf,
        senha: senhapronta,
        cidade: cidade,
        endereço: endereço,
        numero: numero,
      },
    });
    if (!creating) {
      return res.json({
        msg: "Já existe este usuario registrado em nosso sistema",
      });
    }
    return res.json({ msg: "Usuario cadastrado com sucesso!", create });
  },
  ListUser: async (req, res) => {
    const List = await UsuarioModels.findAll();
    if (List.length < 1 || !List) {
      return res.status(422).json({ msg: "Não há nada cadastrado " });
    }
    const nomes = List.map((itens) => itens.nome);
    return res.json(nomes);
  },
  DeletarUsuario: async (req, res) => {
    const { nome, senha, confirm } = req.params;
    if (!nome) {
      return res.json("O nome do usuário é obrigatório");
    } else if (!senha) {
      return res.json("A senha do usuário é obrigatório");
    } else if (!confirm) {
      return res.json("Digite a senha do usuário novamente");
    } else if (confirm && confirm !== senha) {
      return res.json("As senhas devem ser iguais");
    }

    const findUSer = await UsuarioModels.findOne({
      where: {
        nome: nome,
      },
    });
    if (!findUSer) {
      return res.json("Usuário inválido");
    }
    const id = findUSer.id;
    const senhaUser = findUSer.senha;

    const verifiquesenha = await bcrypt.compare(senha, senhaUser);
    if (!verifiquesenha) {
      return res.json("Senha inválida");
    }
    const deleteusuario = await UsuarioModels.destroy({
      where: {
        id: id,
      },
    });
    if (deleteusuario) {
      res.json("Usuario excluido com sucesso!");
    }
  },

  LoginUser: async (req, res) => {
    const { nome, senha, confirm } = req.params;
    if (!nome) {
      return res.json("O nome é obrigatório");
    } else if (!senha) {
      return res.json("A senha é obrigatório");
    } else if (senha && !confirm) {
      return res.json("Digite a senha novamente");
    } else if (confirm && confirm !== senha) {
      return res.json("As senhas devem ser iguais");
    }

    const findUser = await UsuarioModels.findOne({
      where: {
        nome: nome,
      },
    });
    if (!findUser) {
      return res.json("ui");
    }
    const iduser = findUser.id;
    const userinsessap = await sessaoModels.findOne({
      where: {
        usuario_id: iduser,
      },
    });
    if (userinsessap) {
      return res.json("Ujá");
    }

    const coduser = findUser.senha;
    const senhacorreta = await bcrypt.compare(senha, coduser);
    if (!senhacorreta) {
      return res.json("senha incorreta");
    } else if (senhacorreta) {
      return res.json("free");
    }
  },
};
