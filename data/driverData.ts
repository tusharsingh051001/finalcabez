import env from "/Users/tusharsingh/Desktop/APK/cabezdummy/env.json";

const HASURA_WS_URL = env.HASURA_WS_URL;
const HASURA_ADMIN_SECRET = env.HASURA_ADMIN_SECRET;

const QUERY = `
  query MyQuery($parentUUID: String!) {
    parent(where: {uuid: {_eq: $parentUUID}}) {
      driver_id
      driver {
        name
        phone_number
        email_id
        uuid
        age
        blood_group
        id_number
        identification_type
      }
    }
  }
`;

interface Driver {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  uuid: string;
  age: number | null;
  bloodGroup: string | null;
  idNumber: string;
  idType: string;
}

export const fetchDriverData = async (parentUUID: string): Promise<Driver | null> => {
  try {
    const response = await fetch(HASURA_WS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({ query: QUERY, variables: { parentUUID } }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const parent = result.data.parent[0]; // Assuming only one result
    if (!parent) {
      return null;
    }

    const driver = parent.driver;
    return {
      id: parent.driver_id,
      name: driver.name,
      phoneNumber: driver.phone_number,
      email: driver.email_id,
      uuid: driver.uuid,
      age: driver.age,
      bloodGroup: driver.blood_group,
      idNumber: driver.id_number,
      idType: driver.identification_type,
    };
  } catch (err) {
    console.error("Error fetching driver data:", err);
    return null;
  }
};
