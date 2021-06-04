import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from './model/Book';
import { BookService } from './service/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {



  filteredBooks: Book[] = [];

  _filtro: string;

  constructor(private bookService: BookService) { }

  // ngOnInit() {

  //   this.books = this.bookService.retrieveAll();
  //   this.filteredBooks = this.books;
  // }

  set filtro(value: string) {

    this._filtro = value;

    this.filteredBooks = this.books.filter((book: Book) => book.name.toLocaleLowerCase().indexOf(this._filtro.toLocaleLowerCase()) > -1);
}

  get filtro() {

  return this._filtro;

}


formulario: any;
tituloFormulario!: string;
books : Book[];

visibilidadeTabela: boolean = true;
visibilidadeFormulario: boolean = false;


ngOnInit(): void {

  this.bookService.getAll().subscribe(resultado =>{
    this.books = resultado;
    console.log(resultado)
  })

}

ExibirFormularioCadastro(): void
{
  this.visibilidadeTabela = false;
  this.visibilidadeFormulario = true;
  this.tituloFormulario = "Salvar Livro"
  this.formulario = new FormGroup({
    name: new FormControl(null),
    author: new FormControl(null),
    numPages: new FormControl(null),
    image: new FormControl(null)

  });
}

EnviarFormulario(): void
{
  const book : Book = this.formulario.value;
  if(!book.author || !book.name || !book.numPages ){
    alert("favor preencher os campos");
    return
  }
  if(book.id > 0)
  {
    this.bookService.updateBook(book).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Livro atualizado com sucesso");
      this.bookService.getAll().subscribe(registros => {
        this.books = registros;
      });
    });
  }
  else
  {
     this.bookService.saveBook(book).subscribe(resultado => {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
      alert("Livro inserido com sucesso");
      this.bookService.getAll().subscribe(registros => {
        this.books = registros;
      });
    });
  };
}

  ExibirFormularioAtualizacao(Id): void
  {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.bookService.getById(Id).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar Livro`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        name: new FormControl(resultado.name),
        author: new FormControl(resultado.author),
        numPages: new FormControl(resultado.numPages),
        image: new FormControl(resultado.image),
      });
    });
  }

  Voltar(): void
  {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  Excluir(Id): void {

    this.bookService.deleteBook(Id).subscribe(resultado => {

    })
  }


}
