import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { NettingType, Product } from '../INettingType';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-add-edit-netting',
  templateUrl: './add-edit-netting.component.html',
  styleUrls: ['./add-edit-netting.component.scss']
})
export class AddEditNettingComponent implements OnInit {

  nettingForm: FormGroup;
  productList: any;
  selectedProduct: [] = [];
  parmId: string;
  @ViewChild('toasttype')
  private toastObj: ToastComponent;
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.parmId = this.activatedRoute.snapshot.params['id'];
    this.nettingForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.maxLength(128)]],
      isActive: [false, Validators.requiredTrue],
      products: new FormArray([], [Validators.required])
    });
    this.clientService.getProductList().then((data: Product[]) => {
      this.productList = data;
      if (this.productList && this.parmId) {
        this.getNettingType(this.parmId);
      }
      else {
        this.addCheckboxes(['1']);
      }
    })
      .catch((error) => {
        this.showMessage('Error!', 'Something went wrong please try again.', 'danger');
      });
  }
  private addCheckboxes(data) {
    this.productList.forEach((o, i) => {
      let isSelected = data && data.includes(o.id);
      const control = new FormControl(isSelected); // if first item set to true, else false
      (this.nettingForm.controls.products as FormArray).push(control);
    });
  }

  get name() { return this.nettingForm.get('name'); }
  get description() { return this.nettingForm.get('description'); }
  get isActive() { return this.nettingForm.get('isActive'); }
  get products() {
    return this.nettingForm.get('products') as FormArray;
  };

  getNettingType(id) {
    this.clientService.getNettingType(id).then((data: any) => {
      this.nettingForm.controls["name"].setValue(data.name);
      this.nettingForm.controls["description"].setValue(data.description);
      this.nettingForm.controls["isActive"].setValue(data.isActive);
      console.log(data.nettingTypeProduct);
      this.addCheckboxes(data.nettingTypeProduct)

    })
  }

  submit() {
    Object.keys(this.nettingForm.controls).forEach(field => {
      const control = this.nettingForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    this.selectedProduct = this.nettingForm.value.products
      .map((v, i) => v ? this.productList[i].id : null)
      .filter(v => v !== null);
    if (this.nettingForm.invalid || this.selectedProduct.length === 0) {
      return;
    }
    let payLoad: NettingType = {
      tenantId: new Date().valueOf(),
      name: this.nettingForm.get('name').value,
      description: this.nettingForm.get('description').value,
      updatedOn: new Date(),
      updatedBy: 'Admin',
      isActive: true,
      nettingTypeProduct: this.selectedProduct
    }

    this.clientService.addNettingType(payLoad, this.parmId).then((data) => {
      this.showMessage('Success!', 'Netting Type added successfully.', 'success');
      if (!this.parmId) this.nettingForm.reset();

    })
      .catch((error) => {
        this.showMessage('Error!', 'Something went wrong please try again.', 'danger');
      })
  }

  showMessage(title: string, msz: string, type: string) {
    this.toastObj.show({ title: title, content: msz, cssClass: `e-toast-${type}` });
  }
  reset() {
    this.nettingForm.reset();
  }
}
