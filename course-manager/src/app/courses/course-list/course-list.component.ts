import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  _courses: Course[] = [];

  filteredCourses: Course[] = [];

  _filterBy: string;

  constructor(private courseService: CourseService) { }

  // ngOnInit()
  // {
  //   this.retrieveAll();
  // }

  // retrieveAll() :void
  // {
  //   this.courseService.retrieveAll().subscribe({
  //     next: courses =>
  //     {
  //       this._courses = courses;
  //       this.filteredCourses = this._courses;
  //     },
  //     error: err => console.log('Error', err)
  //   });
  // }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
}

get filter() {
  return this._filterBy;
}



formulario: any;
tituloFormulario!: string;
courses : Course[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.courseService.getAll().subscribe(resultado =>{
    this.courses = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Curso"
  this.formulario = new FormGroup({
    name: new FormControl(null),
        code: new FormControl(null),
        description: new FormControl(null),
        duration: new FormControl(null),

  });
}

EnviarFormulario(): void
{
  const course : Course = this.formulario.value;
  if(!course.name || !course.code || !course.description ){
    alert("favor preencher os campos");
    return
  }
  if(course.id > 0)
  {
    this.courseService.updateCourse(course).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Curso atualizado com sucesso");
      this.courseService.getAll().subscribe(registros => {
        this.courses = registros;
      });
    });
  }
  else
  {
     this.courseService.saveCourse(course).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Curso inserido com sucesso");
      this.courseService.getAll().subscribe(registros => {
        this.courses = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(Id): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.courseService.getById(Id).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Livro`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        name: new FormControl(resultado.name),
        code: new FormControl(resultado.code),
        description: new FormControl(resultado.description),
        duration: new FormControl(resultado.duration)
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(Id): void {

    this.courseService.deleteCourse(Id).subscribe(resultado => {

    })
  }

}
