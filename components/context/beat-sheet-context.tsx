import { createContext, Dispatch } from 'react';
import { BeatModel } from '../../services/beat-service';
import { SheetModel } from '../../services/sheet-service';

export interface AppState {
  sheet: SheetModel | null
}

type UpdateSheet = {
  type: 'update_sheet'
  payload: {
    sheet: SheetModel
  }
}

type CreateAct = {
  type: 'create_act',
  payload: {
    name: string
  }
}

type GetActs = {
  type: 'get_acts'
}

type GetAct = {
  type: 'get_act',
  payload: {
    id: number
  }
}

type DeleteAct = {
  type: 'delete_act',
  payload: {
    id: number
  }
}

type UpdateBeat = {
  type: 'update_beat',
  payload: {
    beat: BeatModel
  }
}

type DeleteBeat = {
  type: 'delete_beat',
  payload: {
    id: number
  }
}

type GetBeats = {
  type: 'get_beats',
  payload: {
    id: number
  }
}

type CreateBeat = {
  type: 'create_beat',
  payload: {
    actId: number,
    model: BeatModel
  }
}

type GetBeat = {
  type: 'get_beat',
  payload: {
    id: number
  }
}

export type AppActions = 
  CreateAct 
  | GetActs 
  | GetAct 
  | DeleteAct
  | UpdateBeat
  | DeleteBeat
  | GetBeats
  | CreateBeat
  | GetBeat
  | UpdateSheet

export const BeatSheetContext = createContext<AppState | null>(null);
export const BeatSheetDispatchContext = createContext<Dispatch<AppActions> | null >(null);

export const BeatSheetReducer = (state: AppState, action: AppActions) => {
  switch(action.type) {
    case 'update_sheet':
      return {
        ...state,
        sheet: action.payload.sheet
      }
    default: {
      return state
    }
  }
}

export const initialSheet: AppState = {
  sheet: null
}