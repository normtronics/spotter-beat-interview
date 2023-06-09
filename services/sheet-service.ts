import {
  ActModelCollection,
  createAct,
  deleteAct,
  getActs,
} from "./act-service";
import {
  BeatModel,
  createBeat,
  deleteBeat,
  getBeats,
  updateBeat,
} from "./beat-service";

export interface SheetModel {
  acts: ActModelCollection[] | null;
}

export const getSheet = async (): Promise<SheetModel | null> => {
  console.log("fell into get sheet");
  try {
    const acts = await getActs();

    console.log("fell into get sheet", acts);

    if (acts) {
      const beatsPromiseArray = acts.map((act) => {
        return getBeats(act.id);
      });

      const beats = await Promise.all(beatsPromiseArray);

      const mappedSheet = acts.map((act, index) => {
        return {
          act,
          beats: beats[index],
        };
      });

      const sheet: SheetModel = {
        acts: mappedSheet,
      };

      return sheet;
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addActToSheet = async (
  name: string
): Promise<SheetModel | null> => {
  try {
    await createAct(name);
    return await getSheet();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteActFromSheet = async (
  id: number
): Promise<SheetModel | null> => {
  try {
    await deleteAct(id);
    return await getSheet();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addBeatToAct = async (
  id: number,
  beat: BeatModel
): Promise<SheetModel | null> => {
  try {
    await createBeat(id, beat);
    return await getSheet();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateBeatInAct = async (
  beat: BeatModel
): Promise<SheetModel | null> => {
  console.log("beat update", beat);
  try {
    await updateBeat(beat);
    return await getSheet();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const removeBeatFromAct = async (
  actId: number,
  id: number
): Promise<SheetModel | null> => {
  try {
    await deleteBeat(actId, id);
    return await getSheet();
  } catch (e) {
    console.error(e);
    return null;
  }
};
