
import "./admin.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import {
  doc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";




const Admin = () => {

  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDatail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDatail))
      if (userDatail) {
        const data = JSON.parse(userDatail);

        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            })
          })
         
          setTarefas(lista)
        })
      }
    }

    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault();
    if (tarefaInput === "") {
      toast.info("Digite uma tarefa!")
      return;
    }

    if (edit.id) {
      handleUpdate();
      return;
    }
    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        toast.success("Tarefa registrada com sucesso")
        setTarefaInput('')
      })
      .catch((error) => {
        toast.error("Erro ao registrar" + error)
      })

  }
  async function handleLogout() {
    await signOut(auth);
  }

  async function deletaTarefa(id) {
    const refDoc = doc(db, "tarefas", id);
    await deleteDoc(refDoc);
  }
  async function editeTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item);
  }
  async function handleUpdate() {
    const refDoc = doc(db, "tarefas", edit?.id);
    await updateDoc(refDoc, {
      tarefa: tarefaInput,
    })
      .then(() => {
        toast.success("tarefa atualizada");
        setTarefaInput("");
        setEdit({});
      })
      .catch(() => {
        toast.error("Erro ao atualizar");
        setTarefaInput("");
        setEdit({});
  })
}
return (
  <div className="admin-container">
    <h1>Minhas tarefas</h1>

    <form className="form" onSubmit={handleRegister}>
      <textarea
        placeholder="Digite sua tarefa"
        value={tarefaInput}
        onChange={(e) => setTarefaInput(e.target.value)}
      />
      {Object.keys(edit).length > 0 ? (<button className="btn-register" type="submit" onClick={handleRegister} style={{ background: '#66ac29', color: '#000' }}>Atualizar tarefa</button>) : (<button className="btn-register" type="submit" onClick={handleRegister}>Registrar tarefa</button>)
      }
    </form>

    {tarefas.map((item) => (
      <article key={item.id} className="list">
        <p>{item.tarefa}</p>

        <div>
          <button onClick={() => { editeTarefa(item) }}>Editar</button>
          <button className="btn-delete" onClick={() => { deletaTarefa(item.id) }}>Concluir</button>
        </div>
      </article>
    ))}
    <button className="btn-logout" onClick={handleLogout}>Sair</button>
    <Footer />
  </div>
)
}

export default Admin