import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Time } from '../model/Time';
import { TimeService } from '../service/time.service';

@Component({
  selector: 'app-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent implements OnInit {



  filteredTimes: Time[] = [];

  _filtro: string;

  constructor(private timeService: TimeService) { }

  // ngOnInit() {

  //   this.times = this.timeService.retrieveAll();
  //   this.filteredTimes = this.times;

  // }

  set filtro(value: string) {

    this._filtro = value;

    this.filteredTimes = this.times.filter((times: Time) => times.nome.toLocaleLowerCase().indexOf(this._filtro.toLocaleLowerCase()) > -1);
}

  get filtro() {

  return this._filtro;

}



formulario: any;
tituloFormulario!: string;
times : Time[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.timeService.getAll().subscribe(resultado =>{
    this.times = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Time"
  this.formulario = new FormGroup({
    nome: new FormControl(null),
    estado: new FormControl(null),
    cores: new FormControl(null)

  });
}

EnviarFormulario(): void
{
  const time : Time = this.formulario.value;
  if(!time.nome || !time.estado || !time.cores ){
    alert("favor preencher os campos");
    return
  }
  if(time.id > 0)
  {
    this.timeService.updateTime(time).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Time atualizado com sucesso");
      this.timeService.getAll().subscribe(registros => {
        this.times = registros;
      });
    });
  }
  else
  {
     this.timeService.saveTime(time).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Time inserido com sucesso");
      this.timeService.getAll().subscribe(registros => {
        this.times = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(Id): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.timeService.getById(Id).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Livro`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        estado: new FormControl(resultado.estado),
        cores: new FormControl(resultado.cores)
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(Id): void {

    this.timeService.deleteTime(Id).subscribe(resultado => {

    })
  }

}
