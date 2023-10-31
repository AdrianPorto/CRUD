import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

// import { Container } from './styles';

function EditCandidado({
  openEditCandidato,
  setOpenEditCandidato,
  idCandidato,
  setStatusEdit,
}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [nota01, setNota01] = useState(0.0);
  const [nota02, setNota02] = useState(0.0);
  const [nota03, setNota03] = useState(0.0);

  const editCandidatoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        editCandidatoRef.current &&
        !editCandidatoRef.current.contains(event.target)
      ) {
        setOpenEditCandidato(false);
      }
    }
    if (openEditCandidato) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openEditCandidato]);

  async function editCandidato() {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://servidorlocal.gerencesistemas.com.br:249/candidatos",
      headers: {
        codCandidato: idCandidato.toString(),
        nomeCandidato: nome,
        cpf: cpf,
        telefone: "3344442222",
        nota01: nota01.toString(),
        nota02: nota02.toString(),
        nota03: nota03.toString(),
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200 || response.status === 500) {
          setStatusEdit(200);
          setOpenEditCandidato(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("http://servidorlocal.gerencesistemas.com.br:249/candidatos", {
        headers: {
          codCandidato: idCandidato,
        },
      })
      .then((response) => {
        setNome(response.data[0].nomeCandidato);
        setCpf(response.data[0].cpf);
        setTelefone(response.data[0].telefone);
        setNota01(response.data[0].Notas[0].nota01);
        setNota02(response.data[0].Notas[0].nota02);
        setNota03(response.data[0].Notas[0].nota03);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="w-screen h-screen absolute flex flex-1 justify-center   items-center   bg-black bg-opacity-80 ">
      <div
        className=" flex  w-[500px]   h-[435px] overflow-hidden flex-col opacity-100  rounded-[15px]  bg-white "
        ref={editCandidatoRef}
      >
        <div className="flex bg-blue-600 h-[60px] p-[15px]">
          <div className="  text-white text-[20px] font-bold">
            Editar candidato
          </div>
          <div className="flex flex-1 justify-end text-[30px]">
            <AiOutlineClose
              className="hover:scale-125 duration-500 cursor-pointer text-white"
              onClick={() => {
                setOpenEditCandidato(false);
              }}
            ></AiOutlineClose>
          </div>
        </div>
        <div className="p-[20px]">
          <div>
            <div className="flex flex-1 justify-center flex-col space-y-[5px] mt-[0px]">
              <div>Nome</div>
              <input
                className="w-full  p-[5px] rounded-[5px] h-[35px] border-[1px]  border-zinc-300"
                placeholder="Seu nome..."
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                defaultValue={nome}
              ></input>
            </div>
            <div className="flex space-x-[20px] flex-1  mt-[20px]">
              <div className="space-y-[5px]">
                <div>CPF</div>
                <InputMask
                  mask="999.999.999-99"
                  maskChar="_"
                  className="w-[220px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                  placeholder="___.___.___-__"
                  onChange={(e) => {
                    setCpf(e.target.value);
                  }}
                  defaultValue={cpf}
                  value={cpf}
                ></InputMask>
              </div>

              <div className="space-y-[5px]">
                <div>Telefone</div>
                <InputMask
                  mask="(99)99999-9999"
                  maskChar="_"
                  className="w-[220px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                  placeholder="(__) _____-____"
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  defaultValue={telefone}
                  value={telefone}
                ></InputMask>
              </div>
            </div>
            <div className="flex flex-1 w-full flex-col  text-center mt-[20px]">
              <div>Notas</div>
              <div className="flex space-x-[20px]  justify-center mt-[20px]">
                <div className="space-y-[5px]">
                  <div>Nota 01</div>
                  <InputMask
                    mask="9,9"
                    maskChar=""
                    className="w-[140px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                    placeholder="0,0"
                    onChange={(e) => {
                      setNota01(e.target.value);
                    }}
                    defaultValue={nota01}
                    value={nota01}
                  ></InputMask>
                </div>
                <div className="space-y-[5px]">
                  <div>Nota 02</div>
                  <InputMask
                    mask="9,9"
                    maskChar=""
                    className="w-[140px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                    placeholder="0,0"
                    onChange={(e) => {
                      setNota02(e.target.value);
                    }}
                    defaultValue={nota02}
                    value={nota02}
                  ></InputMask>
                </div>
                <div className="space-y-[5px]">
                  <div>Nota 03</div>
                  <InputMask
                    mask="9,9"
                    maskChar=""
                    className="w-[140px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                    placeholder="0,0"
                    onChange={(e) => {
                      setNota03(e.target.value);
                    }}
                    defaultValue={nota03}
                    value={nota03}
                  ></InputMask>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-blue-600 h-[40px]  rounded-[5px] mt-[20px] text-white font-bold"
              onClick={editCandidato}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCandidado;
