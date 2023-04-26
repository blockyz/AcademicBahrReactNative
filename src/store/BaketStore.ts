import AsyncStorage from "@react-native-async-storage/async-storage";
import { types } from "mobx-state-tree";

type Dataitems = {
  title: string;
  teacher: {
    fullName: string;
    profile: string;
  };
  cost: number;
  lesson: {
    image: string;
    description: string;
  };
  startDate: string;
  endDate: string;
  students:
    | Array<{
        _id: string;
        fullName: string;
        email: string;
        profile: string;
      }>
    | [];
  capacity: number;
  _id: string;
};
const ShopingType = types.model({
  title: types.string,
  teacher: types.model({
    fullName: types.string,
    profile: types.string,
  }),
  cost: types.number,
  lesson: types.model({
    image: types.string,
    description: types.string,
  }),
  _id: types.string,
  capacity: types.number,
  students: types.array(
    types.model({
      _id: types.string,
      fullName: types.string,
      email: types.string,
      profile: types.string,
    })
  ),
  endDate: types.string,
  startDate: types.string,
});
const FaveType = types.model({
  title: types.string,
  teacher: types.model({
    fullName: types.string,
    profile: types.string,
  }),
  cost: types.number,
  lesson: types.model({
    image: types.string,
    description: types.string,
  }),
  _id: types.string,
  capacity: types.number,
  students: types.array(
    types.model({
      _id: types.string,
      fullName: types.string,
      email: types.string,
      profile: types.string,
    })
  ),
  endDate: types.string,
  startDate: types.string,
});

export const BasketStore = types
  .model({
    key: types.string,
    ShopingList: types.array(ShopingType),
    FaveList: types.array(FaveType),
  })
  .actions((self) => ({
    AddCart(data: Dataitems) {
      const bookmark = self.ShopingList.findIndex((x) => x._id === data._id);
      if (bookmark === -1) {
        let students: Array<{
          _id: string;
          fullName: string;
          email: string;
          profile: string;
        }> = [];
        data.students.forEach((x) => {
          students.push({
            _id: x._id,
            email: x.email,
            fullName: x.fullName,
            profile: x.profile,
          });
        });
        const newData: Dataitems = {
          title: data.title,
          teacher: {
            fullName: data.teacher.fullName,
            profile: data.teacher.profile,
          },
          cost: data.cost,
          lesson: {
            image: data.lesson.image,
            description: data.lesson.description,
          },
          students: students,
          _id: data._id,
          capacity: data.capacity,
          endDate: data.endDate,
          startDate: data.startDate,
        };
        self.ShopingList.push(newData);
        AsyncStorage.setItem(
          self.key,
          JSON.stringify({
            Basket: self.ShopingList,
            Fave: self.FaveList,
          })
        );
      }
    },
    RemoveCart(data: string) {
      const bookmark = self.ShopingList.findIndex((x) => x._id === data);
      if (bookmark !== -1) {
        self.ShopingList.splice(bookmark, 1);
        AsyncStorage.setItem(
          self.key,
          JSON.stringify({
            Basket: self.ShopingList,
            Fave: self.FaveList,
          })
        );
      }
    },
    SetAllShop(data: Dataitems[]) {
      self.ShopingList.splice(0);
      data.forEach((x) => {
        self.ShopingList.push(x);
      });
    },
    AddFave(data: Dataitems) {
      const bookmark = self.FaveList.findIndex((x) => x._id === data._id);
      if (bookmark === -1) {
        let students: Array<{
          _id: string;
          fullName: string;
          email: string;
          profile: string;
        }> = [];
        data.students.forEach((x) => {
          students.push({
            _id: x._id,
            email: x.email,
            fullName: x.fullName,
            profile: x.profile,
          });
        });
        const newData: Dataitems = {
          title: data.title,
          teacher: {
            fullName: data.teacher.fullName,
            profile: data.teacher.profile,
          },
          cost: data.cost,
          lesson: {
            image: data.lesson.image,
            description: data.lesson.description,
          },
          students: students,
          _id: data._id,
          capacity: data.capacity,
          endDate: data.endDate,
          startDate: data.startDate,
        };
        self.FaveList.push(newData);
        AsyncStorage.setItem(
          self.key,
          JSON.stringify({
            Basket: self.ShopingList,
            Fave: self.FaveList,
          })
        );
      }
    },
    RemoveFave(data: string) {
      const bookmark = self.FaveList.findIndex((x) => x._id === data);
      if (bookmark !== -1) {
        self.FaveList.splice(bookmark, 1);
        AsyncStorage.setItem(
          self.key,
          JSON.stringify({
            Basket: self.ShopingList,
            Fave: self.FaveList,
          })
        );
      }
    },
    SetAllFavorite(data: Dataitems[]) {
      self.FaveList.splice(0);
      data.forEach((x) => {
        self.FaveList.push(x);
      });
    },
    SetUserId(data: string) {
      self.key = data;
    },
  }));
