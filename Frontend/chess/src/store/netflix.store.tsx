import { create } from "zustand";
import { axiosInstance } from "../config/axios";

type vid = {
  _id: string;
  id: number;
  title: string;
  description: string;
  players: string[];
  type: string;
  thumbnail: string;
  video: string;
  totalViews: number;
};

type store = {
  content: vid | null;
  topten: vid[] | null;
  byplayer: vid[] | null;
  searchedContent: vid[] | null;
  catogerycontent: vid[]|null;

  getcontent: (id: string) => void;
  gettopten: () => void;
  getbyplayer: (player: string) => void;
  getbycatgery:(catogery:string)=>void;
};

export const Usenetflix = create<store>((set) => ({

  content: null,
  topten: null,
  byplayer: null,
  searchedContent: null,
  catogerycontent: null,

  // SINGLE CONTENT
  getcontent: async (id) => {

    try {

      const res = await axiosInstance.get(
        `/netflix/getcontent/${id}`
      );

      console.log(res.data);

      set({
        content: res.data.content,
      });

    } catch (error) {

      console.log(error);

    }
  },

  // TOP TEN
  gettopten: async () => {

    try {

      const res = await axiosInstance.get(
        "/netflix/topten"
      );

      console.log(res);

      set({
        topten: res.data.data,
      });

    } catch (error) {

      console.log(error);

    }
  },

  // GET BY PLAYER
  getbyplayer: async (player) => {

    try {

      const res = await axiosInstance.get(
        "/netflix/getplayers",
        {
          params: {
            player,
          },
        }
      );

      set({
        byplayer: res.data.content,
      });

    } catch (error) {

      console.log(error);

    }
  },

  getbycatgery: async (category) => {
  try {
    const res = await axiosInstance.get("/netflix/findbycatogary", {
      params: {
        catogery: category,
      },
    });

    set({ catogerycontent: res.data.content });

  } catch (error) {
    console.log(error);
  }
}

}));