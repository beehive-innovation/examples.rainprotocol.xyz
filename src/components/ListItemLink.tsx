import React from "react";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ListItemLink ({to, text}: { to: string, text: string }) {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        itemProps,
        ref,
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemText primary={text} />
    </ListItem>
  )
}
