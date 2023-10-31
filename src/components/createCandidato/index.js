import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
// import { Container } from './styles';

function CreateCandidato({
  openCreateCandidato,
  setOpenCreateCandidato,
  setStatusCreate,
}) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const [nota01, setNota01] = useState(0.0);
  const [nota02, setNota02] = useState(0.0);
  const [nota03, setNota03] = useState(0.0);

  const createCandidatoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        createCandidatoRef.current &&
        !createCandidatoRef.current.contains(event.target)
      ) {
        setOpenCreateCandidato(false);
      }
    }
    if (openCreateCandidato) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCreateCandidato]);

  function createCandidato() {
    const data = {
      nomeCandidato: nome,
      cpf: cpf,
      telefone: telefone,
      Notas: [
        {
          nota01: nota01,
          nota02: nota02,
          nota03: nota03,
        },
      ],
    };
    const dataJson = JSON.stringify(data);

    axios
      .post(
        "http://servidorlocal.gerencesistemas.com.br:249/candidatos",
        { dataJson },
        {
          headers: {
            nomeCandidato: nome,
            cpf: cpf,
            telefone: telefone,
            nota01: nota01,
            nota02: nota02,
            nota03: nota03,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setStatusCreate(200);
          setOpenCreateCandidato(false);
        }
      })
      .catch((err) => {});
  }

  return (
    <div className="w-screen h-screen absolute flex flex-1 justify-center   items-center   bg-black bg-opacity-80 ">
      <div
        className=" flex  w-[500px]   h-[430px] flex-col opacity-100  rounded-[15px] overflow-hidden bg-white "
        ref={createCandidatoRef}
      >
        <div className="flex bg-green-600 h-[60px] p-[15px]">
          <div className="  text-white text-[20px] font-bold">
            Novo candidato
          </div>
          <div className="flex flex-1 justify-end text-[30px]">
            <AiOutlineClose
              className="hover:scale-125 duration-500 cursor-pointer text-white"
              onClick={() => {
                setOpenCreateCandidato(false);
              }}
            ></AiOutlineClose>
          </div>
        </div>
        <div className="p-[20px]">
          <div>
            <div className="flex flex-1 justify-center flex-col space-y-[5px] ">
              <div>Nome</div>
              <input
                className="w-full  p-[5px] rounded-[5px] h-[35px] border-[1px]  border-zinc-300"
                placeholder="Seu nome..."
                onChange={(e) => {
                  setNome(e.target.value);
                }}
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
                ></InputMask>
              </div>

              <div className="space-y-[5px]">
                <div>Telefone</div>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  className="w-[220px] p-[5px] rounded-[5px] h-[35px] border-[1px] border-zinc-300"
                  placeholder="(__) _____-____"
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
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
                  ></InputMask>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-green-600 h-[40px]  rounded-[5px] mt-[20px] text-white font-bold"
              onClick={createCandidato}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCandidato;
