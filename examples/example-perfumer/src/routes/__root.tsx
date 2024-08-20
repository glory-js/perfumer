import {
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router"
import styled from "@emotion/styled"

const Root = styled.div({
  display: "flex",
  flexDirection: "row",
})

const SideMenu = styled.div({
  flex: "0 0 200px",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid gray",
})

const MenuItem = styled(Link)({
  lineHeight: "30px",
})

const Main = styled.div({})

export const Route = createRootRoute({
  component: () => (
    <Root>
      <SideMenu>
        <MenuItem to="/antd">Ant</MenuItem>
      </SideMenu>
      <Main>
        <Outlet/>
      </Main>
    </Root>
  ),
})
