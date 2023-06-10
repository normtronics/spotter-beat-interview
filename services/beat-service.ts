const apiUrl = process.env.NEXT_PUBLIC_API_HOST;

export interface BeatModel {
  id: number;
  name: string;
  time: string;
  content: string;
  cameraAngle: string;
  notes: string;
}

export const updateBeat = async (
  model: BeatModel
): Promise<{ success: boolean } | null> => {
  try {
    const path = `/acts/beats/${model.id}`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
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

export const deleteBeat = async (
  actId: number,
  id: number
): Promise<{ success: boolean } | null> => {
  try {
    const path = `/acts/${actId}/beats/${id}`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("delete service", res);

    const json = await res.json();

    return {
      success: true,
    };
  } catch (e) {
    console.log("delete service err", e);
    console.error(e);
    return null;
  }
};

export const getBeats = async (actId: number): Promise<BeatModel[] | null> => {
  try {
    const path = `/acts/${actId}/beats`;

    const res = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const createBeat = async (
  actId: number,
  model: BeatModel
): Promise<{ success: boolean } | null> => {
  try {
    const path = `/acts/${actId}/beats`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: model.name,
        time: model.time,
        content: model.content,
        cameraAngle: model.cameraAngle,
        notes: model.notes,
      }),
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

export const getBeat = async (id: number): Promise<BeatModel | null> => {
  try {
    const path = `/beats/${id}`;
    const res = await fetch(`${apiUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return null;
  }
};
