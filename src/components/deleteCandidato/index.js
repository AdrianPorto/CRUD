import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
// import { Container } from './styles';

function DeleteCandidato({
  openDeleteCandidato,
  setOpenDeleteCandidato,
  idCandidato,
  nomeCandidato,
  setStatusDelete,
}) {
  const deleteCandidatoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        deleteCandidatoRef.current &&
        !deleteCandidatoRef.current.contains(event.target)
      ) {
        setOpenDeleteCandidato(false);
      }
    }
    if (openDeleteCandidato) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDeleteCandidato]);

  function deleteCandidato() {
    axios
      .delete("http://servidorlocal.gerencesistemas.com.br:249/candidatos", {
        headers: {
          codCandidato: idCandidato,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setOpenDeleteCandidato(false);
          setStatusDelete(200);
        }
      })
      .catch((err) => {});
  }

  return (
    <div className="w-screen h-screen absolute flex flex-1 justify-center   items-center   bg-black bg-opacity-80 ">
      <div
        className=" flex  w-[500px]   h-[300px] flex-col opacity-100  rounded-[15px] overflow-hidden  bg-white "
        ref={deleteCandidatoRef}
      >
        <div className="flex bg-red-600 h-[60px] p-[15px]">
          <div className="  text-white text-[20px] font-bold">
            Deletar candidato
          </div>
          <div className="flex flex-1 justify-end text-[30px]">
            <AiOutlineClose
              className="hover:scale-125 duration-500 cursor-pointer text-white"
              onClick={() => {
                setOpenDeleteCandidato(false);
              }}
            ></AiOutlineClose>
          </div>
        </div>
        <div className="p-[20px]">
          <div className="mt-[60px] mb-[60px]">
            Tem certeza que deseja deletar o candidato <b>{nomeCandidato}</b> ?
          </div>
          <button
            className="w-full bg-red-600 h-[40px]  rounded-[5px] mt-[20px] text-white font-bold"
            onClick={deleteCandidato}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCandidato;
