// import { observable, action, makeObservable } from "mobx";
// export class MyStore {
//   somedata = "";

//   SetData(data: string) {
//     this.somedata = data;
//   }

//   constructor() {
//     makeObservable(this, {
//       somedata: observable,
//       SetData: action,
//     });
//   }
// }

import { types } from "mobx-state-tree";
import { BasketStore } from "./BaketStore";
import { FilteringStore } from "./FiltereingStore";
import { Registration } from "./Registration";
import { SettingStore } from "./SettingStore";

const RootStore = types
  .model({
    filteringStore: FilteringStore,
    registration: Registration,
    basket: BasketStore,
    setting: SettingStore,
  })
  .views((self) => ({
    getFilteringData() {
      return self.filteringStore;
    },
    getRegisterationData() {
      return self.registration;
    },
    getBasketData() {
      return self.basket;
    },
    getSettingData() {
      return self.setting;
    },
  }));

const rootStore = RootStore.create({
  filteringStore: {
    somedata: "",
    SortDirection: "asc",
    SearchOption: "Course",
    Sort: "",
    Cost: [0, 500000],
    Capacity: [0, 500],
    SubmitFilter: {
      sort: "",
      sortdir: "",
      searchOp: "Course",
      cost: [0, 500000],
      capacity: [0, 500],
    },
    isOn: false,
  },
  registration: {
    Active: false,
    user: {
      _id: "",
      birthDate: "",
      email: "",
      fullName: "",
      isActive: false,
      nationalId: "",
      phoneNumber: "",
      profile: "",
      registerDate: "",
      role: "",
    },
    token: "",
    resetPasswordToken: "",
  },
  basket: {
    key: "",
    ShopingList: [],
    FaveList: [],
  },
  setting: {
    Darkmode: false,
    Lock: {
      lock: false,
      shouldNavigate: false,
      password: "",
    },
    themeColor: {
      mode: "light",
      pallete: "blue",
    },
  },
});

export default rootStore;
