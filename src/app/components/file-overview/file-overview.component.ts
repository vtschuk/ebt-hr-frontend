import {Component, OnInit} from '@angular/core';
import {IPerson, Person} from '../../model/person';
import {PersonService} from '../../services/person.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Address} from '../../model/address';
import {MatTableDataSource} from "@angular/material/table";
import {AboutDialogComponent} from "../about-dialog/about-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginService} from "../../services";

@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.css'],
})
export class FileOverviewComponent implements OnInit {

  personen: IPerson[] = [];
  displayedColumns: string[] = ['id', 'vorname', 'name', 'email', 'ansicht', "edit"];
  dataSource: MatTableDataSource<IPerson> = new MatTableDataSource<IPerson>();

  constructor(private personService: PersonService, private route: Router, private toastr: ToastrService, private router: Router, public dialog: MatDialog, private loginService: LoginService) {

  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.personen = []
    this.personService.getAllPersons().subscribe(personen => {
      this.dataSource.data = personen
    }, () => {
      this.toastr.error("kann keine Aktenliste abrufen")
    });
  }

  addNewEntry() {
    var person = new Person(0, 'Vorname', 'Nachname', 'person@mail.org', new Address(1234, '', '', '', '', 1), new Date().toISOString(), "");
    console.log('Add a new Entry');
    this.personService.createNewPerson(person).subscribe(person => {
      this.toastr.success("Neue Akte wird angelegt")
      console.log(person)
      this.personService.getAllPersons().subscribe(personen => {
        this.dataSource.data = personen
      }, () => {
        this.toastr.error("kann keine Aktenliste abrufen")
      });
    }, () => {
      this.toastr.error("kann keine Akte angelegen")
    })
  }

  administrate() {
    this.router.navigate(['/admin'])
  }

  logout() {
    this.loginService.logout()
  }

  about() {
    this.dialog.open(AboutDialogComponent, {
      data: null,
    });
  }
}
