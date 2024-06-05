const sessãoModels = require("../models/seçãoModels.js");
const userModels = require("../models/usuarioModels.js");
const bcrypt = require("bcrypt");
module.exports = {
  createSeção: async (req, res) => {
    const { posição, nomeusuario, senhausuario, confirm } = req.body;
    if (!posição && posição !== 0) {
      return res.json("A posição da poltrona é obrigatório");
    } else if (!nomeusuario) {
      return res.json("O nome do usuario é obrigatório");
    } else if (!senhausuario) {
      return res.json("A senha do usuario é obrigatório");
    } else if (senhausuario && !confirm) {
      return res.json("Preencha as senhas novamente");
    } else if (confirm && confirm !== senhausuario) {
      return res.json("As senhas devem ser iguais");
    }

    const nomuser = await userModels.findOne({
      where: {
        nome: nomeusuario,
      },
    });
    if (!nomuser) {
      return res.json("Usuario inválido");
    }
    const iduser = nomuser.id;
    const senhauser = nomuser.senha;

    const confirmando = await bcrypt.compare(senhausuario, senhauser);

    if (!confirmando) {
      return res.json("Senha inválida");
    }

    const temsessao = await sessãoModels.findOne({
      where: {
        posição: posição,
      },
    });
    if (temsessao) {
      return res.json("sessao inválida");
    }

    const usernasessao = await sessãoModels.findOne({
      where: {
        usuario_id: iduser,
      },
    });
    if (usernasessao) {
      return res.json({
        msg: "este usuario já esta cadastrado em uma das poltronas",
      });
    }
    const createSeção = await sessãoModels.create({
      posição: posição,
      usuario_id: iduser,
      concluida: true,
    });

    if (createSeção) {
      res.json({ msg: "Sessão cadastrada com sucesso" });
    }
  },
  Listcoluna1: async (req, res) => {
    const findAll = await sessãoModels.findAll({
      where: {
        coluna: 1,
      },
      order: [["cadeira", "ASC"]],
      include: [{ association: "us", as: "us", attributes: ["nome"] }],
    });
    if (findAll.length < 1 || !findAll) {
      return res.json("Não há nenhuma sessão cadastrada na coluna 1");
    }
    return res.json(findAll);
  },
  Listsessaoforid: async (req, res) => {
    const { posicao } = req.params;
    const findsection = await sessãoModels.findOne({
      where: {
        posição: posicao,
      },
    });

    if (findsection) {
      return res.json({ msg: "Sessão inválida", findsection });
    }
    return res.json(1);
  },
  BuscaConcluida: async (req, res) => {
    const findAll = await sessãoModels.findAll();
    const soconcluida = findAll.map((itens) => itens.posição);
    if (findAll) {
      res.json(soconcluida);
    }
  },
  VerificarUsuarionaSala: async (req, res) => {
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

    const findUSer = await userModels.findOne({
      where: {
        nome: nome,
      },
    });
    if (!findUSer) {
      return res.json("Usuário inválido");
    }
    const id = findUSer.id;
    const senhaUser = findUSer.senha;
    const findOnsection = await sessãoModels.findOne({
      where: {
        usuario_id: id,
      },
      include: [{ association: "us", as: "us", foreignKey: "usuario_id" }],
    });
    const verifiquesenha = await bcrypt.compare(senha, senhaUser);
    if (!verifiquesenha) {
      return res.json("Senha inválida");
    } else if (!findOnsection) {
      return res.json(
        "Não existe nenhum usuário com este nome registrado em nossa sessão"
      );
    }
    const dadosUsuario = findOnsection.us.nome;
    res.json({ findOnsection, dadosUsuario });
  },
};
