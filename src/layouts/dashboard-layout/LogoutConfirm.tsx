/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "../../context/UserDetailsProvider.tsx";
import { useUserProps } from "../../types";
import Button from "../../components/FormComponents/Button";
import { InfoCircle } from "iconsax-react";

export default function LogoutConfirm({ setLogoutConfirmation }: any) {
  const { logout } = useUser() as useUserProps;
  return (
    <>
      <div className="bg-white p-4 w-[400px] h-[220px] rounded-md flex flex-col gap-4 items-center justify-center">
        <InfoCircle size="48" color="#A30162" />
        <h4 className="text-grey900 font-bold text-lg">Are you sure ?</h4>
        <div className="w-full flex gap-2">
          <Button
            title="Cancel"
            className="w-full text-center rounded-2xl border border-primary"
            backgroundColor="bg-none"
            textColor="text-primary"
            type="button"
            onClick={() => setLogoutConfirmation(false)}
          />
          <Button
            title="Logout"
            className="w-full text-center rounded-2xl"
            backgroundColor="bg-primary_100"
            type="button"
            onClick={logout}
          />
        </div>
      </div>
    </>
  );
}
