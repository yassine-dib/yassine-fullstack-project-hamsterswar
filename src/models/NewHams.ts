

export interface NewHams {
  map(arg0: (hamster: any) => JSX.Element): import("react").ReactNode;
  level: string;
 
  name: string;
  age: number;
  favFood: string;
  loves:string;
  imgName:string;
  wins: number;
  defeats: number;
  games: number;
  id: string;
}
export interface Data {
  name: string;
  age: number;
  favFood: string;
  loves: string;
  imgName: string;
  wins: number;
  defeats: number;
  games: number;
}
