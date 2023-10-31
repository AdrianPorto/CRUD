import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaTrash, FaPlus } from "react-icons/fa6";
import CreateCandidato from "./components/createCandidato";
import EditCandidato from "./components/editCandidato";
import DeleteCandidato from "./components/deleteCandidato";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [candidatos, setCandidatos] = useState([]);
  const [openCreateCandidato, setOpenCreateCandidato] = useState(false);
  const [openEditCandidato, setOpenEditCandidato] = useState(false);
  const [openDeleteCandidato, setOpenDeleteCandidato] = useState(false);
  const [idCandidato, setIdCandidato] = useState(0);
  const [nomeCandidato, setNomeCandidato] = useState("");
  const [statusCreate, setStatusCreate] = useState(0);
  const [statusEdit, setStatusEdit] = useState(0);
  const [statusDelete, setStatusDelete] = useState(0);

  useEffect(() => {
    axios
      .get("http://servidorlocal.gerencesistemas.com.br:249/candidatos")
      .then((response) => {
        setCandidatos(response.data);
      })
      .catch((err) => {});
  }, [openCreateCandidato, openDeleteCandidato, openEditCandidato]);
  function mediaCalc(nota01, nota02, nota03) {
    const media = (nota01 + nota02 + nota03) / 3;

    return media.toFixed(1);
  }

  useEffect(() => {
    if (statusCreate === 200) {
      toast.success("Candidato criado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    if (statusEdit === 200) {
      toast.success("Candidato editado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (statusDelete === 200) {
      toast.success("Candidato excluído com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, []);

  return (
    <div className="flex flex-1  w-full h-screen justify-center items-center ">
      <div
        className="w-[1240px] h-[600px] border rounded-[20px] shadow-xl border-zinc-400  
        flex justify-center items-center pt-[40px] space-y-[40px] 
        pb-[40px] p-[50px] flex-col "
      >
        <div className="flex flex-col border h-[450px] border-zinc-400 rounded-[20px] overflow-hidden  ">
          <div className="flex flex-row    ">
            <div className=" p-[5px] rounded-tl-[20px] w-[80px] text-white bg-zinc-800  flex justify-center  ">
              Cód
            </div>
            <div className=" p-[5px] w-[300px]  text-white bg-zinc-800  ">
              Nome
            </div>
            <div className="   p-[5px] w-[150px]  text-white bg-zinc-800 ">
              CPF
            </div>
            <div className=" p-[5px] w-[145px]  text-white bg-zinc-800 ">
              Telefone
            </div>
            <div className=" p-[5px] w-[65px]   text-white bg-zinc-800 ">
              Nota 1
            </div>
            <div className=" p-[5px] w-[65px]   text-white bg-zinc-800 ">
              Nota 2
            </div>
            <div className=" p-[5px] w-[65px]   text-white bg-zinc-800 ">
              Nota 3
            </div>
            <div className=" p-[5px] w-[60px]   text-white bg-zinc-800 ">
              Média
            </div>
            <div className=" p-[5px] w-[80px]   text-white bg-zinc-800 ">
              Situação
            </div>
            <div className=" p-[5px] w-[153px] text-white bg-zinc-800    rounded-tr-[20px] ">
              Ações
            </div>
          </div>
          <div className=" overflow-y-auto">
            {candidatos.map((candidato, index) => (
              <div className="flex flex-row " key={index}>
                <div className="border flex justify-center items-center  w-[80px] ">
                  {candidato.codCandidato}
                </div>
                <div className="border flex justify-center items-center  w-[300px]">
                  {candidato.nomeCandidato}
                </div>
                <div className="border flex justify-center items-center  w-[150px]">
                  {candidato.cpf}
                </div>
                <div className="border flex justify-center items-center  w-[145px]">
                  {candidato.telefone}
                </div>
                <div className="border flex justify-center items-center  w-[65px]">
                  {candidato.Notas[0].nota01}
                </div>
                <div className="border flex justify-center items-center ] w-[65px]">
                  {candidato.Notas[0].nota02}
                </div>
                <div className="border flex justify-center items-center  w-[65px]">
                  {candidato.Notas[0].nota03}
                </div>
                <div className="border flex justify-center items-center  w-[60px]">
                  {mediaCalc(
                    candidato.Notas[0].nota01,
                    candidato.Notas[0].nota02,
                    candidato.Notas[0].nota03
                  )}
                </div>
                <div
                  className={`  flex justify-center items-center w-[80px] font-bold text-white ${
                    mediaCalc(
                      candidato.Notas[0].nota01,
                      candidato.Notas[0].nota02,
                      candidato.Notas[0].nota03
                    ) >= 7.0
                      ? "bg-green-600"
                      : "bg-red-600"
                  } `}
                >
                  {mediaCalc(
                    candidato.Notas[0].nota01,
                    candidato.Notas[0].nota02,
                    candidato.Notas[0].nota03
                  ) >= 7.0
                    ? "APTO"
                    : "INAPTO"}
                </div>
                <div className="border p-[10px] w-[150px] flex flex-row space-x-[20px] justify-center ">
                  <div
                    className="w-[40px] h-[40px] rounded-[10px] bg-red-600 cursor-pointer  hover:scale-125 duration-500 
                 text-white  justify-center items-center flex"
                    onClick={() => {
                      setOpenDeleteCandidato(true);
                      setIdCandidato(candidato.codCandidato);
                      setNomeCandidato(candidato.nomeCandidato);
                    }}
                  >
                    <FaTrash></FaTrash>
                  </div>
                  <div
                    className="w-[40px] h-[40px] rounded-[10px] cursor-pointer  hover:scale-125 duration-500 bg-blue-500
                 text-white  justify-center items-center flex"
                    onClick={() => {
                      setOpenEditCandidato(true);
                      setIdCandidato(candidato.codCandidato);
                    }}
                  >
                    <BsFillPencilFill></BsFillPencilFill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="bg-green-600 w-[40px] h-[40px] rounded-full text-white text-[25px] cursor-pointer
         flex justify-center items-center hover:scale-125 duration-500"
          onClick={() => {
            setOpenCreateCandidato(true);
          }}
        >
          <FaPlus></FaPlus>
        </div>
      </div>
      {openCreateCandidato && (
        <CreateCandidato
          openCreateCandidato={openCreateCandidato}
          setOpenCreateCandidato={setOpenCreateCandidato}
          setStatusCreate={setStatusCreate}
        ></CreateCandidato>
      )}
      {openEditCandidato && (
        <EditCandidato
          openEditCandidato={openEditCandidato}
          setOpenEditCandidato={setOpenEditCandidato}
          setStatusEdit={setStatusEdit}
          idCandidato={idCandidato}
        ></EditCandidato>
      )}
      {openDeleteCandidato && (
        <DeleteCandidato
          openDeleteCandidato={openDeleteCandidato}
          setOpenDeleteCandidato={setOpenDeleteCandidato}
          setStatusDelete={setStatusDelete}
          idCandidato={idCandidato}
          nomeCandidato={nomeCandidato}
        ></DeleteCandidato>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
