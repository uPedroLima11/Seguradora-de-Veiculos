import { useState } from "react"
import { useForm } from "react-hook-form"

function App() {
  const { register, handleSubmit, reset } = useForm()
  const [mensa1, setMensa1] = useState("")
  const [mensa2, setMensa2] = useState("")

  function calculaSeguro(data) {
    
    const valor = Number(data.valor)
    const ano = Number(data.ano)
    let seguro 
    const anoAtual = new Date().getFullYear()
    if (anoAtual - ano <= 5) {
      seguro = valor * 0.03
    } else {
      seguro = valor * 0.04
    }
    if (data.renova) {
      seguro = seguro - (seguro * 0.10)
    }
    const parcela = seguro / 12
    setMensa1("À Vista R$ " + seguro.toLocaleString("pt-br", {minimumFractionDigits: 2}))
    setMensa2("ou 12x de R$ " + parcela.toLocaleString("pt-br", {minimumFractionDigits: 2}))
  }

  function limpaMensa() {
    setMensa1("")
    setMensa2("")
    reset({
      renova: false
    })
  }

  return (
    <div className="">
      <nav class="navbar bg-info">
        <div class="">
          <a class="navbar-brand" href="#">
            <img src="./logo.png" alt="Logo"
              width="50" height="40" class="d-inline-block me-3" />
            Seguradora de Veículos
          </a>
        </div>
      </nav>
      <div class="card text-center mt-3 w-75 mx-auto">
        <div class="card-header">
          <img src="./logo.png" alt="Seguro" width={200} />
          <h4>Seguradora de Veículos Avenida</h4>
        </div>
        <form class="card-body" 
           onSubmit={handleSubmit(calculaSeguro)}
           onReset={limpaMensa} >
          <div class="row">
            <div class="col">
              <input type="text" class="form-control"
                placeholder="Modelo do Veículo" required
                {...register("modelo")} />
            </div>
            <div class="col">
              <input type="number" class="form-control"
                placeholder="Ano" required
                {...register("ano")} />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <input type="number" class="form-control"
                placeholder="Valor R$ (Fipe)" required
                {...register("valor")} />
            </div>
            <div class="col">
              <input class="form-check-input" type="checkbox"
                {...register("renova")} />
              <label class="form-check-label ms-2">
                É Renovação
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Calcular</button>
          <button type="reset" class="btn btn-danger mt-3 ms-4">Limpar</button>
        </form>
        <div class="card-footer text-body-secondary">
          <div className="row">
            <div className="col">
              <h2 className="text-primary">
                &nbsp;
                {mensa1}
              </h2>
            </div>
            <div className="col">
              <h2 className="text-primary">
                {mensa2}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
