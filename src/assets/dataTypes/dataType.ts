export interface courseData {
  id: number;
  name: string;
  code: string;
  fees: string;
  gst: string;
  discription: string;
  totalFee: string;
}
export interface instituteData {
  id: number;
  iname: string;
  address: { addressLine: string; locality: string; city: string; state: string; pin: number };
  googleMap: string;
  icontact: string;
  icategory: string[];
  iMetaTag: string[];
}
export interface studentsData {
  id: number;
  sname: string;
  roll: string;
  email: string;
  scontact: string;
  parentName: string;
  parentContact: string;
  parentEmail: string;
  address: string;
  course: string;
  batch: string;
  discount: string;
  addDiscount: string;
  netPayable: string;
  installments: string;
  nextInstallment: string;
  amtCollected: string;
  mode: string;
  materialRecord: string;
}
export interface receiptData {
  id: number;
  businessName: string;
  address: string;
  gstNo: string;
  termsAndCondtions: string;
  fee: string;
}
export interface batchData {
  id: number;
  course: string;
  code: string;
  discription: string;
}

export interface discountData {
  id: number;
  code: string;
  amount: string;
  discription: string;
}
