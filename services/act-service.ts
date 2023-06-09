import { BeatModel } from "./beat-service";

const apiUrl = process.env.API_HOST || "http://localhost:8080";

export interface ActModel {
  id: number;
  name: string;
}

export interface ActModelCollection {
  act: ActModel;
  beats: BeatModel[] | null;
}

export const getActs = async (): Promise<ActModel[] | null> => {
  try {
    const path = "/acts";

    console.log(`${apiUrl}${path}`);

    const res = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    return json;
  } catch (e) {
    console.log("error");
    console.error(e);
    return null;
  }
};

export const createAct = async (
  name: string
): Promise<{ success: true } | null> => {
  try {
    const path = "/acts";

    const res = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAct = async (id: number): Promise<ActModel | null> => {
  try {
    const path = `/acts/${id}`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    return json;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteAct = async (
  id: number
): Promise<{ success: boolean } | null> => {
  try {
    const path = `/acts/${id}`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};
