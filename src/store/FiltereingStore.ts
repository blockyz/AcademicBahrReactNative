import { types } from "mobx-state-tree";

export const FilteringStore = types
  .model({
    somedata: types.string,
    isOn: types.boolean,
    SortDirection: types.string,
    SearchOption: types.string,
    Sort: types.string,
    Cost: types.array(types.number),
    Capacity: types.array(types.number),
    SubmitFilter: types.model({
      sort: types.string,
      sortdir: types.string,
      searchOp: types.string,
      cost: types.array(types.number),
      capacity: types.array(types.number),
      // add other properties as needed
    }),
  })
  .actions((self) => ({
    SetData(data: string) {
      self.somedata = data;
    },
    SetSortDir(data: string) {
      self.SortDirection = data;
    },
    SetSearchOp(data: string) {
      self.SearchOption = data;
    },
    SetSort(data: string) {
      self.Sort = data;
    },
    SetOnOff(data: boolean) {
      self.isOn = data;
    },
    SetCost(data: number[]) {
      self.Cost.replace(data);
    },
    SetCapacity(data: number[]) {
      self.Capacity.replace(data);
    },
    SetSubmit() {
      self.SubmitFilter.sort = self.Sort;
      self.SubmitFilter.searchOp = self.SearchOption;
      self.SubmitFilter.sortdir = self.SortDirection;
      self.SubmitFilter.cost.replace(self.Cost);
      self.SubmitFilter.capacity.replace(self.Capacity);
    },
    SetClear() {
      self.somedata = "";
      self.SortDirection = "asc";
      self.SearchOption = "Course";
      self.Sort = "";
      self.Cost.replace([0, 500000]);
      self.Capacity.replace([0, 500]);
    },
  }));

// const filteringStore = FilteringStore.create({
//   somedata: "",
// });
