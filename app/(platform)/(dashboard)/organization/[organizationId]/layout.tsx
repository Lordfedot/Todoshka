import { OrgControl } from "./_components/org-control";

type Props = {
  children: React.ReactNode;
};

const OrganizationIdLayout = ({ children }: Props) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
