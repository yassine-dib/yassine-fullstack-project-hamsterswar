import { atom } from "recoil";
import { NewHams } from "../models/NewHams";

//Gallery State
const allHamsters = atom<NewHams[]>({
	key: 'allHamsters',
	default: []
})



export default allHamsters 