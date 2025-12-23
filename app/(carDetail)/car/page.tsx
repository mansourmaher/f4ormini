import { getAllCars } from "@/actions/car/car";
import AllCars from "../_components/all-cars";
import { auth } from "@/auth";
import { getUserProfile } from "@/actions/auth/account";

const page = async () => {
  const cars = await getAllCars();
  const user = await getUserProfile();

  return <AllCars cars={cars} user={user} />;
};

export default page;
