import { Logo } from "./logo/Logo";

interface Props {}

export function Sidebar({}: Props) {
  return <div className=" flex justify-between bg-primary p-[1.5rem] w-[20rem] min-h-full">
    <Logo />
  </div>
}
