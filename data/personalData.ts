import env from "/Users/tusharsingh/Desktop/APK/cabezdummy/env.json";

const HASURA_WS_URL = env.HASURA_WS_URL;
const HASURA_ADMIN_SECRET = env.HASURA_ADMIN_SECRET;

const QUERY = `
  query MyQuery($parentUUID: String!) {
    parent(where: {uuid: {_eq: $parentUUID}}) {
      account_expiry_date
      account_start_date
      blood_group
      email_id
      guardian_name
      name
      phone_number
      pickup_address
      age
      city
      school_address
      state
      zip_code
    }
  }
`;

export interface PersonalData {
  firstName: string;
  lastName: string;
  age: number | null;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  accountExpiryDate: string | null;
  accountStartDate: string | null;
  bloodGroup: string | null;
  driverId: string | null;
  guardianName: string | null;
  pickupAddress: string | null;
  schoolAddress: string | null;
}

export const fetchPersonalData = async (
  parentUUID: string
): Promise<PersonalData | null> => {
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

    const parent = result.data.parent[0];
    if (!parent) {
      return null;
    }

    let firstName = "";
    let lastName = "";
    if (parent.name) {
      const nameParts = parent.name.split(" ");
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    }

    const address = {
      street: parent.pickup_address || "",
      city: parent.city || "",
      state: parent.state || "",
      zipCode: parent.zip_code || "",
    };

    return {
      firstName,
      lastName,
      age: parent.age,
      email: parent.email_id,
      phoneNumber: parent.phone_number,
      address,
      accountExpiryDate: parent.account_expiry_date,
      accountStartDate: parent.account_start_date,
      bloodGroup: parent.blood_group,
      guardianName: parent.guardian_name,
      pickupAddress: parent.pickup_address,
      schoolAddress: parent.school_address,
    };
  } catch (err) {
    console.error("Error fetching personal data:", err);
    return null;
  }
};

export default fetchPersonalData;
