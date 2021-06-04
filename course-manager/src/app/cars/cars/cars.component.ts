import { Component, OnInit } from '@angular/core';
import { Car } from '../model/Car';
import { FormControl, FormGroup } from '@angular/forms';
import { CarService } from '../service/car.service';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private carService: CarService) { }

formulario: any;
tituloFormulario!: string;
cars : Car[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.carService.getAll().subscribe(resultado =>{
    this.cars = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Carro"
  this.formulario = new FormGroup({
    march: new FormControl(null),
    model: new FormControl(null),
    qtdDoor: new FormControl(null),
    color: new FormControl(null),
    year: new FormControl(null)

  });
}

EnviarFormulario(): void
{
  const car : Car = this.formulario.value;
  if(!car.march || !car.model || !car.year || !car.qtdDoor || !car.color ){
    alert("favor preencher os campos");
    return
  }
  if(car.id > 0)
  {
    this.carService.updateCar(car).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Carro atualizado com sucesso");
      this.carService.getAll().subscribe(registros => {
        this.cars = registros;
      });
    });
  }
  else
  {
     this.carService.saveCar(car).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Carro inserido com sucesso");
      this.carService.getAll().subscribe(registros => {
        this.cars = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(Id): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.carService.getById(Id).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Livro`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        march: new FormControl(resultado.march),
        model: new FormControl(resultado.model),
        qtdDoor: new FormControl(resultado.qtdDoor),
        color: new FormControl(resultado.color),
        year: new FormControl(resultado.year)
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(Id): void {

    this.carService.deleteCar(Id).subscribe(resultado => {

    })
  }



}
