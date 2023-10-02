import AuthGuard from "@/guards/AuthGuard";
// eslint-disable-next-line react/display-name
const withAuth = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);

export default withAuth
